import { get } from 'lodash'
import { THEME_OPTIONS } from '@/utils/Constants';

// =============================================================================
// = 系统主题的定义
const stThemeStorageName: string = 'theme' // 存储主题字段名称
const stDefaultTheme: string = THEME_OPTIONS[0] // 默认主题
let stCurUseTheme: string = '' // 当前使用系统主题

//! 初始化系统主题
export const initTheme = () => {
    changeTheme(getTheme(), false)
}

//! 切换主题
export const changeTheme = (stArgTheme: string, bIsNeedSave: boolean = true) => {
    // 不支持的主题 以及 设置的主题就是正在使用的主题, 直接返回
    if (!THEME_OPTIONS.find(stThemeItem => stThemeItem == stArgTheme)){
        return
    }
    
    document.documentElement.setAttribute('data-theme', stArgTheme)

    if (!bIsNeedSave || stArgTheme == stCurUseTheme){
        return
    }

    stCurUseTheme = stArgTheme

    // 1.如果用户已登录, 那么需要调用API更新用户自定义的主题
    // 2.在本地保存主题
    Tools.LocalStorage.setItem(stThemeStorageName, stCurUseTheme)
}

//! 获取当前正在使用的主题
export const getTheme = () => {
    if (stCurUseTheme){
        return stCurUseTheme
    }

    const iLoginUser = app.getAppCtl().getLoginUser()

    // 优先从登录者的自定义信息中获取
    stCurUseTheme = get(iLoginUser, 'cust.theme')
    // 其次从本地存储中获取
    stCurUseTheme = stCurUseTheme || Tools.LocalStorage.getItem(stThemeStorageName)    
    // 最终使用默认主题
    stCurUseTheme = stCurUseTheme || stDefaultTheme

    return stCurUseTheme
}



