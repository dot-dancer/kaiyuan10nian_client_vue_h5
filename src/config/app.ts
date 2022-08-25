import type { RouteRecordRaw } from 'vue-router'
import sysCfg, { ISysCfg, ISysCfgBModItem } from './syscfg'
import appCtl from '@/controller/AppCtl'
import { isArray } from 'lodash';

// =============================================================================
// = 存放所有业务模块对应的路由信息
let giAllBModRoutes: RouteRecordRaw[] = []

interface IBModRouterOper{
    registBModRoute(mixRoute: RouteRecordRaw[] | RouteRecordRaw): void;
    getAllBModRoutes(): RouteRecordRaw[];
}
const routeBModRouterOper: IBModRouterOper = {
    //! 注册业务模块对应的路由信息
    registBModRoute(mixRoute){
        if (!mixRoute){
            return
        }

        if (isArray(mixRoute)){
            giAllBModRoutes = giAllBModRoutes.concat(mixRoute)
            return
        }

        giAllBModRoutes.push(mixRoute)
    },
    getAllBModRoutes(){
        return giAllBModRoutes
    }
}

// =============================================================================
// = 全局变量app的实现
const app = {
    // 业务模块路由相关操作
    ...routeBModRouterOper, 

    //! 获取系统配置信息
    getConfig<T>(key: keyof ISysCfg): T{
        return sysCfg[key] as unknown as T
    },

    //! 判断是否启用了指定的业务模块
    checkBmodIsEnable(stModuleName: string){
        const bmodNames: ISysCfgBModItem[] = app.getConfig<ISysCfgBModItem[]>('bmodNames')

        if (bmodNames.find(item => item.name == stModuleName && item.enable)){
            return true
        }

        return false
    },
    //! 基础平台控制器相关操作
    getAppCtl(){
        return appCtl
    }
}

export type IApp = typeof app

export default app