import { createApp } from 'vue'
import App from './App.vue'
import { initApp, initGlobalComponents } from '@/config/init'
import { initRouter } from './router'

import './assets/styles/base-theme.scss'
import './assets/styles/blue-theme.scss'
import './assets/styles/black-theme.scss'

import 'normalize.css/normalize.css'
import './assets/fonts/iconfont.css'
import './assets/styles/global.scss'

(async () => {

    // =========================================================================
    // = 初始化系统基础配置信息(保证所有模块的基础数据加载完成后, 才创建UI)
    // = 1.全局变量(app), 语言包(lpk), Ajax, Tools的定义
    // = 2.异步加载基础模块的配置信息
    // =   1). 加载系统当前的状态信息
    // =   2). 加载当前登录用户的个人信息
    // = 3.异步加载业务模块，并完成基本的初始化
    await initApp()

    // =========================================================================
    // = 初始化UI
    const uiApp = createApp(App)

    // =========================================================================
    // = 注册全局组件
    initGlobalComponents(uiApp)

    // =========================================================================
    // = 向根组件绑定全局对象
    uiApp.config.globalProperties.app = window.app
    uiApp.config.globalProperties.Tools = window.Tools
    uiApp.config.globalProperties.lpk = window.lpk

    // =========================================================================
    // = 初始化状态管理与路由, 并渲染根组件
    // = 1.初始化基础模块的路由配置
    // = 2.初始化各业务模块的路由配置
    // = 3.对路由守卫进行处理
    // = 4.keep-alive的使用
    uiApp.use(initRouter()).mount('#app')
})()
