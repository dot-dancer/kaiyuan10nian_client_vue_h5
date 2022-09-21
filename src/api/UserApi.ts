import { get } from 'lodash'
import mdlBaseApi from './BaseApi'

export interface IUser{
    id: number;
    name: string;
}

const initBaseAPIParams: BaseAPIType.IInitParams = {
    uri: {
        get: {path: '/data_get.json', errMsg: 'err.user.load'},
        list: {path: '/data.json', errMsg: 'err.user.load'},
    },
    // mapper(item: GlobalType.IRecord): IUser{
    //   return {
    //     id: get(item, 'id'),
    //     name: get(item, 'name111')
    //   }  
    // }
}

export default {
    ...mdlBaseApi.initApi<IUser, Pick<BaseAPIType.IMethods<IUser>, 'get' | 'list'>>(initBaseAPIParams),
    getSelfInfo(): Promise<IUser>{
        return Promise.resolve({
            id: 1,
            name: 'zs'
        })
    }
}

