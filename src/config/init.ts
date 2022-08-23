import { App } from 'vue'
import app from './app'
import Tools from '@/utils/Tools'
import { initLoginUserInfo } from '@/controller/AppCtl'
import { lpk, initLpk } from './lpk'

// =============================================================================
// = 绑定全局变量
// = 为了操作方便, 选择向window上挂载几个全局对象, 其它模块**禁止创建全局对象**
// 声明全局变量相关类型
type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'Ajax'
type IGlobalVars = {
    [key in IGlobalVarsKey]?: any
}

// 开始向window上面挂载全局变量
// 注意: 因为不想分开在各自的实现中挂载全局变量, 所以像: Ajax的初始化中会用到app
// 而当时app还未被全局化, 所以在Ajax初始化过程中只能通过import app 方式来使用, 
// 其它几个全局模块也类似。这样也有一个好处不用在乎各变量所在文件的引入顺序
const iGlobalVars: IGlobalVars = {
    app,   // 全局应用对象, 挂载一些全局数据与操作方法
    lpk,   // 全局获取语言包内容方法
    Tools, // 全局自定义工具库
}

Object.keys(iGlobalVars).forEach(stKey => {
    (window as any)[stKey as IGlobalVarsKey] = iGlobalVars[stKey as IGlobalVarsKey]
});

// =============================================================================
// = 初始化系统的实现, 导出初始化系统配置信息的实现, 供主入口处调用
export const initApp = async () => {
    // -------------------------------------------------------------------------
    // - 初始化基础业务相关的信息(比如: 获取当前登录者信息等)
    await initLoginUserInfo()

    // -------------------------------------------------------------------------
    // - 主题定制
    // - 1.针对不同主题去书写不现的样式文件, 在系统初始化时, 根据当前使用的主题, 
    //     到Server端去加载对应的样式文件来使用
    // - 2.通过SCSS变量与SCSS里面的函数和mixin来实现主题的定制
    // - 3.通过CSS变量来实现主题的定制

    // -------------------------------------------------------------------------
    // - 加载基础平台的语言包 
    // import.meta.glob 不支持以变量方式加载数据, 
    // 因此只有全都加载, 然后再过滤不需要的语言包内容
    initLpk()

    // -------------------------------------------------------------------------
    // - 初始化各业务模块
    const iAllEntry: GlobalType.IRecord = import.meta.glob('@/bmod/*/entry.ts', {eager: true})
    for (const path  in iAllEntry){
        const iEntryFile = iAllEntry[path]
        iEntryFile && iEntryFile.entryInit && await iEntryFile.entryInit()
    }
}

// =============================================================================
// = 注册全局组件
export const initGlobalComponents = (uiApp: App<Element>) => {
    const iAllGlobalComponents: GlobalType.IRecord = import.meta.glob('@/components/*/src/*.vue', {eager: true})
    Object.keys(iAllGlobalComponents).map((path: string) => {
        const paths = path.split('/')
        const stCmpName = paths[paths.length - 3]
        uiApp.component(stCmpName, iAllGlobalComponents[path].default)
    })
}