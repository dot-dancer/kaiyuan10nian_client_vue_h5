import { IApp } from '@/config/app'
import { IFnLpk } from '@/config/lpk'
import { ITools } from '@/utils/Tools'
import Icon from '@/components/Icon'
import type { IAjax, IResponse } from '@/utils/Request'

declare global{
    declare namespace GlobalType{
        type IKey = string | number;
        type IRecord = Record<IKey, any>;
    }

    declare namespace BaseAPIType{
        interface IMethods<T>{
            get(params: GlobalType.IRecord): Promise<T>;
            list(params: GlobalType.IRecord): Promise<IListResult<T>>;
            post(params: GlobalType.IRecord): Promise<IResponse>;
            put(params: GlobalType.IRecord): Promise<IResponse>;
            patch(params: GlobalType.IRecord): Promise<IResponse>;
            delete(params: GlobalType.IRecord): Promise<IResponse>;
        }

        interface IListResult<T = any>{
            total: number;
            items: T[];
        }

        interface IURIItem{
            path: string;
            errMsg: string;
            fnUrlTransfer?: (url: string, params: IRecord) => string;
            fnParamsTransfer?: (url: string, params: IRecord) => IRecord;
        }

        interface IURI{
            [key: string]: IURIItem
        }

        interface IInitParams<T = IRecord>{
            mapper?: (item: IRecord) => T;
            uri: IURI
        }
    }

    const app: IApp
    const Tools: ITools
    const lpk: IFnLpk
    const Ajax: IAjax 

    type ITimeout = ReturnType<typeof setTimeout>

    interface Window{
        app: IApp;      // 全局app对象, 挂载一些全局数据与操作方法
        Tools: ITools;  // 全局工具库对象, 其中包含一些公用方法
        lpk: IFnLpk;    // 全局语言包支持函数
        Ajax: IAjax;    // 全局Ajax请求库
    }
}

// https://vuejs.org/api/utility-types.html#componentcustomproperties
// 为了让<template>中的lpk在typescript环境不会报错, 还需要增加下面声明
// 注意: 该声明必须放置到module中, 否则就会覆盖全局类型, 而不是增强全局类型
declare module 'vue' {
    interface GlobalComponents{
        Icon: typeof Icon
    }

    interface ComponentCustomProperties {
      app: IApp;
      Tools: ITools;
      lpk: IFnLpk;
    }
}

export {}