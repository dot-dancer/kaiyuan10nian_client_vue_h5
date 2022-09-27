import { LOGIN_PATH, LOGIN_TOKEN } from '@/utils/Constants'
import mdlUserApi, { IUser } from '@/api/UserApi'
import { mergeLpk, changeLocale } from '@/config/lpk'
import { changeTheme } from '@/config/theme'

let iLoginUser: IUser = {} as IUser // 缓存登录者个人信息

//! 获取登录者个人信息
export const initLoginUserInfo = async () => {
    if (Tools.Cookie.getItem(LOGIN_TOKEN)){
        iLoginUser = await mdlUserApi.getSelfInfo()
    }
}

export default {
    getLoginUser(){
        return iLoginUser
    },
    clearLoginInfo(){
        iLoginUser = {} as IUser
        Tools.Cookie.removeItem(LOGIN_TOKEN)
    },
    redirectToLogin(){
        this.clearLoginInfo()
        document.location.href = LOGIN_PATH
    },
    changeLocale,
    mergeLpk,
    changeTheme,
}