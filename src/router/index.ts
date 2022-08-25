/*! @file
********************************************************************************
<PRE>
文件实现功能   : 基础模块的路由配置
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/08/25   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { get } from 'lodash'
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import { ROUTER_VIEW_KEY } from '@/utils/Constants'
import Index from '@/views/Index/Index.vue'

type RouteRecordRawExt = RouteRecordRaw & {children?: RouteRecordRawExt[]}
let giAllRoutes: RouteRecordRawExt[]  = []

export const initRouter: () => Router = () => {
    let routes: RouteRecordRawExt[] = [
        {path: '/', redirect: '/index'},
        {
            path: '/index',
            name: 'index',
            component: Index,
            meta: {
                title: lpk('page.index.Title'),
                requireAuth: false,
                hostRouterViewKey: ROUTER_VIEW_KEY.Index,
            },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/views/Index/Home.vue'),
                    meta: {
                        requireAuth: false,
                    }
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('@/views/My/My.vue'),
                    meta: {
                        title: lpk('page.my.Title'),
                    }
                }
            ]
        },
        {path: '/login', name: 'login', component: () => import('@/views/Login/Login.vue'), meta: {title: lpk('page.login.Title'), requireAuth: false}},
        {path: '/regist', name: 'regist', component: () => import('@/views/Login/Regist.vue'), meta: {title: lpk('page.regist.Title'), requireAuth: false}},
    ]

    // =========================================================================
    // = 聚合业务模块的路由信息
    routes = routes.concat(app.getAllBModRoutes())
    routes.push({path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('@/views/NotFound.vue')})
    giAllRoutes = routes
    
    // =========================================================================
    // = 收集所有"宿主RouterView"对应的各业务模块注册的"属于子路由"
    gatherBelongToRoute()

    const iRouter = createRouter({
        history: createWebHistory(),
        routes
    })

    iRouter.afterEach((to, from) => {
        const title = get(to, 'meta.title', '')
        title && (document.title = title)
    })

    return iRouter
}

//! 收集所有"宿主RouterView"对应的各业务模块注册的"属于子路由"
const gatherBelongToRoute = () => {
    const _Do = (hostRoute: RouteRecordRawExt, giRoutes: RouteRecordRawExt[]) => {
        const stHoldRouterViewKey = get(hostRoute, 'meta.hostRouterViewKey')
        if (!stHoldRouterViewKey || !giRoutes.length){
            return
        }

        for (let i=0; i<giRoutes.length;){
            const iFindItem = giRoutes[i]
            // 宿主路由为将要查找路由数组中的一员, 则停止查找
            if (hostRoute == iFindItem){
                i++
                continue;
            }

            if (stHoldRouterViewKey == get(iFindItem, 'meta.belongToRouterViewKey')){
                hostRoute.children = hostRoute.children || []
                hostRoute.children.push(iFindItem)
                giRoutes.splice(i, 1)
            } else {
                iFindItem.children && (_Do(hostRoute, iFindItem.children))
                i++
            }
        }
    }

    giAllRoutes.map(item => _Do(item, giAllRoutes))
}