export const LOGIN_PATH = '/login' // 登录路径
export const LOGIN_TOKEN = 'token' // 登录token
export const LOCALE_OPTIONS = ['zh-CN', 'en-US'] // 系统语言环境
export const THEME_OPTIONS = ['blue', 'black'] // 系统主题
export const EMAIL_PATTERN = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ // 邮箱验证正则
export const MOBILE_PATTERN = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ // 手机号验证正则
export const ICON_TYPE = {ADD: 'add', EDIT: 'edit', REMOVE: 'remove'}
export const ROUTER_VIEW_KEY = {Index: 'indexRouterView'} // 首页路由标识
export enum APIMethods {
    GET     = 'get',
    LIST    = 'list',
    POST    = 'post',
    PUT     = 'put',
    PATCH   = 'patch',
    DELETE  = 'delete',
}