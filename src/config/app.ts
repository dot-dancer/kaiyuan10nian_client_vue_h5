import sysCfg, { ISysCfg, ISysCfgBModItem } from './syscfg'
import appCtl from '@/controller/AppCtl'

// =============================================================================
// = 全局变量app的实现
const app = {
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