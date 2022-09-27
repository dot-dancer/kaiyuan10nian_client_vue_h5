import { get } from 'lodash'
import mdlBaseApi, { APIMethods } from './BaseApi'

export interface IUser{
    id: number;
    name: string;
}

const initBaseAPIParams: BaseAPIType.IInitParams = {
    uri: {
        [APIMethods.GET]: {
            path: '/data_get.json', // 'data_get_detail.json'
            errMsg: 'err.user.load',
            // fnUrlTransfer(url, params){
            //     return 'data_get_detail.json'
            // },
            // fnParamsTransfer(url, params){
            //     return {
            //         id: 9999999,
            //     }
            // },
        },
        [APIMethods.LIST]: {path: '/data.json', errMsg: 'err.user.load'},
        [APIMethods.POST]: {path: '/user/add', errMsg: '添加用户失败'},
    },
    // mapper(item: GlobalType.IRecord): IUser{
    //   return {
    //     id: get(item, 'id'),
    //     name: get(item, 'name111')
    //   }  
    // }
}

export default {
    ...mdlBaseApi.initApi<IUser, Pick<BaseAPIType.IMethods<IUser>, APIMethods.GET | APIMethods.LIST | APIMethods.POST>>(initBaseAPIParams),
    getSelfInfo(): Promise<IUser>{
        return Promise.resolve({
            id: 1,
            name: 'zs'
        })
    }
}

