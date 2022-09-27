/*! @file
********************************************************************************
<PRE>
文件实现功能   : 基础API的实现
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/09/28   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { get } from 'lodash'
import { IResponse } from '@/utils/Request'
import { APIMethods } from '@/utils/Constants'
export { APIMethods } from '@/utils/Constants'

// =============================================================================
// = 类型定义
type IFnUrlAndParamsTransfer = (type: string, uriItem: BaseAPIType.IURIItem, params: GlobalType.IRecord) => {url: string, params: GlobalType.IRecord}

// =============================================================================
// = 局部全局方法与变量的定义
//! 对url 与 params 支持自定义的处理
const transferUrlAndParams: IFnUrlAndParamsTransfer = (type, uriItem, params = {}) => {
    let url = uriItem.path

    if (APIMethods.GET === type || APIMethods.DELETE === type){
        // {id: 2}
        // user/:id
        const stIdName = 'id'
        url = url.replace(`:${stIdName}`, get(params, stIdName))
    }

    uriItem.fnUrlTransfer && (url = uriItem.fnUrlTransfer(url, params))
    uriItem.fnParamsTransfer && (params = uriItem.fnParamsTransfer(url, params))

    return {
        url,
        params,
    }
}

export default {
    initApi<T = any, R = BaseAPIType.IMethods<T>>(initParams: BaseAPIType.IInitParams<T>): R{
        const iAllMethods: BaseAPIType.IMethods<T> = {} as any

        [APIMethods.GET, APIMethods.LIST, APIMethods.POST, APIMethods.PUT, APIMethods.PATCH, APIMethods.DELETE].map(method => {
            switch (method) {
                case APIMethods.GET: {
                    iAllMethods[method] = (params: GlobalType.IRecord): Promise<T> => {
                        return Ajax.get<T>({
                                        ...transferUrlAndParams('get', get(initParams, `uri.${method}`), params)
                                    }).then(res => {
                                        return initParams.mapper ? initParams.mapper(res.data) : res.data as T
                                    }).catch((e) => {
                                        Tools.processApiError(get(initParams, `uri.${method}.errMsg`, ''), e)
                                        return {} as T
                                    })
                    }
                }
                break

                case APIMethods.LIST: {
                    iAllMethods[method] = (params: GlobalType.IRecord): Promise<BaseAPIType.IListResult<T>> => {
                        const iResult: BaseAPIType.IListResult<T> = {
                            total: 0,
                            items: [],
                        }
        
                        return Ajax.get<T>({
                                        ...transferUrlAndParams('list', get(initParams, `uri.${method}`), params)
                                    }).then(res => {
                                        const { total, items = []} = res.data as BaseAPIType.IListResult<T>
                                        iResult.total = total
                                        iResult.items = items.map(item => {
                                            return initParams.mapper ? initParams.mapper(item) : item as T
                                        })
        
                                        return iResult
                                    }).catch((e) => {
                                        Tools.processApiError(get(initParams, `uri.${method}.errMsg`, ''), e)
                                        return iResult
                                    })
                    }
                }
                break

                case APIMethods.POST:
                case APIMethods.PUT:
                case APIMethods.PATCH:
                case APIMethods.DELETE: {
                    iAllMethods[method] = (params: GlobalType.IRecord): Promise<IResponse> => {
                        return Ajax[method]<T>({
                                        ...transferUrlAndParams(method, get(initParams, `uri.${method}`), params)
                                    }).catch((e) => {
                                        Tools.processApiError(get(initParams, `uri.${method}.errMsg`, ''), e)
                                        return {} as IResponse
                                    })
                    }
                }
                break
            }
        })

        return iAllMethods as R
    }
}