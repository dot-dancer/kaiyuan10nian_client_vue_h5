import { LOGIN_TOKEN } from '@/utils/Constants'
import mdlUserApi, { IUser } from '@/api/UserApi'
import { mergeLpk, changeLocale } from '@/config/lpk'

let iLoginUser: IUser = {} as IUser // 缓存登录者个人信息

//! 获取登录者个人信息
export const initLoginUserInfo = async () => {
    if (Tools.Cookie.getItem(LOGIN_TOKEN)){
        iLoginUser = await mdlUserApi.getSelfInfo()
    }
}

export default {
    getLoginUser(): IUser{
        return iLoginUser
    },
    changeLocale,
    mergeLpk,
}