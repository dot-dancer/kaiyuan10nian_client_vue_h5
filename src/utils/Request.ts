/*! @file
********************************************************************************
<PRE>
文件实现功能   : 基于Axios实现Ajax请求的封装
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/09/13   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { get } from 'lodash'
import app from '@/config/app'
import { LOGIN_TOKEN, APIMethods } from './Constants';

// =============================================================================
// = 定义 或 扩展axios的类型
export interface AxiosRequestConfigExt extends AxiosRequestConfig{
    reqParams?: AxiosRequestConfigExt,      // 请求参数
    showLoading?: boolean;                  // 是否显示loading提示
    bIsNeedCachePrevent?: boolean;          // 是否加上防缓存的cp随机数
    bIsNeedJsonStringify?: boolean;         // 是否需要JSON.stringify
    bIsNeedQSStringify?: boolean;           // 是否需要qs.stringify
    force401ToLogin?: boolean;              // 遇401是否强制跳转到登录界面
}

export interface IResponse<T = any>{
    code: number;
    data: T;
    msg: string;
}

// =============================================================================
// = 设置axios默认配置选项
axios.defaults.headers.head['Content-Type'] = 'application/json;charset=utf-8'

// =============================================================================
// = 定义该模板内全局变量
let timerLoading: ITimeout
const axiosInstance: AxiosInstance = axios.create({
    baseURL: app.getConfig('baseUrl'),
    timeout: 10000,
})

// =============================================================================
// = 定义每次请求响应处理
axiosInstance.interceptors.response.use((res: AxiosResponse<IResponse>) => {
    // -------------------------------------------------------------------------
    // - 请求未出异常处理
    // 清除loading计时器, 并且隐藏loading
    clearTimeout(timerLoading)
    Tools.hideLoadMask()

    // -------------------------------------------------------------------------
    // - 获取响应内容, 以及外界调用请求时传递的参数值
    const { status, data, config } = res
    const { reqParams = {} } = config as AxiosRequestConfigExt
    const { force401ToLogin = false} = reqParams

    // -------------------------------------------------------------------------
    // - http: 200状态码情况处理
    if (200 == status){
        if (data){
            if (401 == data.code && force401ToLogin){
                app.getAppCtl().redirectToLogin()
                return
            } else if ((data.code >= 400 && data.code <= 404) || 500 == data.code){
                return Promise.reject(data)
            }
        }

        return data
    }
    // -------------------------------------------------------------------------
    // - http: 非200状态码情况处理
    else {
        return Promise.reject(data)
    }

}, (error) => {
    // -------------------------------------------------------------------------
    // - 请求未出异常处理
    // 清除loading计时器, 并且隐藏loading
    clearTimeout(timerLoading)
    Tools.hideLoadMask()

    // -------------------------------------------------------------------------
    // - 翻译错误解释
    let { message = 'Request Error', response } = error
    const stErrMsg = get(response, 'data.msg', message)
    return Promise.reject({msg: stErrMsg})
})

// =============================================================================
// = 定义常用请求方法
type IAjaxMethod = APIMethods.GET | APIMethods.POST | APIMethods.PUT | APIMethods.PATCH | APIMethods.DELETE
type IFnAjaxMethodHandler = <T = any>(reqParams: AxiosRequestConfigExt) => Promise<IResponse<T>>

// =============================================================================
// = 绑定多种请求类型的方法
const iAllMethods: {[key in IAjaxMethod]: IFnAjaxMethodHandler} = {} as any
const gstMethods: string[] = [APIMethods.GET,  APIMethods.POST,  APIMethods.PUT,  APIMethods.PATCH,  APIMethods.DELETE].map(method => method.toUpperCase())
gstMethods.map(method => {
    const fnHandler: IFnAjaxMethodHandler = <T = any>(reqParams: AxiosRequestConfigExt | string): Promise<IResponse<T>> => {
        if (APIMethods.GET == method){
            if ('string' === typeof reqParams){
                reqParams = {
                    url: reqParams,
                    params: '',
                }
            }
        }

        return Ajax.request<T>(method, reqParams as AxiosRequestConfigExt)
    }

    iAllMethods[method.toLocaleLowerCase() as IAjaxMethod] = fnHandler
})


const Ajax = {
    ...iAllMethods,
    request<T = any>(method: string, reqParams: AxiosRequestConfigExt): Promise<IResponse<T>>{
        // ---------------------------------------------------------------------
        // - 获取请求参数
        let {
            url, 
            params,
            headers = {},
            timeout,
            showLoading = true,
            bIsNeedCachePrevent,
            bIsNeedJsonStringify,
            bIsNeedQSStringify,
        } = reqParams

        // ---------------------------------------------------------------------
        // - 判断是否需要显示loading
        if (false !== showLoading){
            clearTimeout(timerLoading)
            timerLoading = setTimeout(() => {
                Tools.showLoadMask()
            }, 200)
        }

        // ---------------------------------------------------------------------
        // - 判断是否需要加防缓存处理
        (false !== bIsNeedCachePrevent) && (url = Tools.addCachePrevent(url))
        
        // ---------------------------------------------------------------------
        // - 是否需要JSON.stringify
        bIsNeedJsonStringify && (params = JSON.stringify(params))

        // ---------------------------------------------------------------------
        // - 是否需要qs.stringify
        bIsNeedQSStringify && (params = qs.stringify(params))

        // ---------------------------------------------------------------------
        // - 设置登录Token
        const stLoginToken = Tools.Cookie.getItem(LOGIN_TOKEN)
        stLoginToken && (headers.Authorization = `Bearer ${stLoginToken}`)

        // ---------------------------------------------------------------------
        // - 组装请求参数
        const iSendReqParams: AxiosRequestConfigExt = {
            reqParams: reqParams,
            url,
            method: (gstMethods.indexOf(method) > -1 ? method : 'GET'),
            [method === APIMethods.GET ? 'params' : 'data']: params,
            headers: Object.assign({}, headers),
        }
        timeout && (iSendReqParams.timeout = timeout)

        // ---------------------------------------------------------------------
        // - 发起请求
        return axiosInstance.request(iSendReqParams)
    }
}

export type IAjax = typeof Ajax

export default Ajax