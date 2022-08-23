import { IApp } from '@/config/app'
import { IFnLpk } from '@/config/lpk'
import { ITools } from '@/utils/Tools'

declare global{
    declare namespace GlobalType{
        type IKey = string | number;
        type IRecord = Record<IKey, any>;
    }

    const app: IApp
    const Tools: ITools
    const lpk: IFnLpk

    interface Window{
        app: IApp; // 全局app对象, 挂载一些全局数据与操作方法
        Tools: ITools; // 全局工具库对象, 其中包含一些公用方法
        lpk: IFnLpk; // 全局语言包支持函数
    }
}

// https://vuejs.org/api/utility-types.html#componentcustomproperties
// 为了让<template>中的lpk在typescript环境不会报错, 还需要增加下面声明
// 注意: 该声明必须放置到module中, 否则就会覆盖全局类型, 而不是增强全局类型
declare module 'vue' {
    interface ComponentCustomProperties {
      app: IApp;
      Tools: ITools;
      lpk: IFnLpk;
    }
}

export {}