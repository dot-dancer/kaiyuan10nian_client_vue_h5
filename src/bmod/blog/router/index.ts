/*! @file
********************************************************************************
<PRE>
文件实现功能   : blog 模块路由配置信息
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/08/26   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import type { RouteRecordRaw } from 'vue-router'
import { ROUTER_VIEW_KEY } from '@/utils/Constants'
import syscfg from '../config/syscfg'

export const initRoutes = () => {
    const stPath = `/${syscfg.module}`

    // -------------------------------------------------------------------------
    // - 定义当前模块对应的路由信息
    const giRoutes: RouteRecordRaw[] = [{
        name: `blogIndex`,
        path: stPath,
        meta: {
            title: lpk('Blog'),
            requireAuth: false,
            belongToRouterViewKey: ROUTER_VIEW_KEY.Index,
        },
        component: () => import('../views/Index/BlogIndex.vue'),
    }, {
        name: 'articleDetail',
        path: `${stPath}/article/detail/:id`,
        meta: {
            requireAuth: false,
        },
        component: () => import('../views/article/Detail/ArticleDetail.vue'),
    }, {
        name: 'editArticle',
        path: `${stPath}/article/edit`,
        meta: {
            title: lpk('page.blog.article.edit'),
        },
        component: () => import('../views/article/Edit/EditArticle.vue')
    }]
    
    app.registBModRoute(giRoutes)
}