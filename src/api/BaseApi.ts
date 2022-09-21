import { get } from 'lodash'
import { IResponse } from '@/utils/Request'

export default {
    initApi<T = any, R = BaseAPIType.IMethods<T>>(initParams: BaseAPIType.IInitParams<T>): R{
        return {
            get(params: GlobalType.IRecord): Promise<T>{
                // {id: 2}
                // user/:id
                const stIdName = 'id'
                return Ajax.get<T>({
                                url: get(initParams, 'uri.get.path').replace(`:${stIdName}`, get(params, stIdName)),
                                params,
                            }).then(res => {
                                return initParams.mapper ? initParams.mapper(res.data) : res.data as T
                            }).catch((e) => {
                                Tools.processApiError(get(initParams, 'uri.get.errMsg', ''), e)
                                return {} as T
                            })
            },
            list(params: GlobalType.IRecord): Promise<BaseAPIType.IListResult<T>>{
                const iResult: BaseAPIType.IListResult<T> = {
                    total: 0,
                    items: [],
                }

                return Ajax.get<T>({
                                url: get(initParams, 'uri.list.path'),
                                params,
                            }).then(res => {
                                const { total, items = []} = res.data as BaseAPIType.IListResult<T>
                                iResult.total = total
                                iResult.items = items.map(item => {
                                    return initParams.mapper ? initParams.mapper(item) : item as T
                                })

                                return iResult
                            }).catch((e) => {
                                Tools.processApiError(get(initParams, 'uri.list.errMsg', ''), e)
                                return iResult
                            })
            },
            post(params: GlobalType.IRecord): Promise<IResponse>{
                return Ajax.post({
                            url: get(initParams, 'uri.post.path'),
                            params,
                        }).catch((e) => {
                            Tools.processApiError(get(initParams, 'uri.post.errMsg', ''), e)
                            return {} as IResponse
                        })
            },
            put(params: GlobalType.IRecord): Promise<IResponse>{
                return Ajax.put({
                            url: get(initParams, 'uri.put.path'),
                            params,
                        }).catch((e) => {
                            Tools.processApiError(get(initParams, 'uri.put.errMsg', ''), e)
                            return {} as IResponse
                        })
            },
            delete(params: GlobalType.IRecord): Promise<IResponse>{
                // user/:id
                const stIdName = 'id'
                return Ajax.delete<T>({
                                url: get(initParams, 'uri.delete.path').replace(`:${stIdName}`, get(params, stIdName)),
                                params,
                            }).catch((e) => {
                                Tools.processApiError(get(initParams, 'uri.delete.errMsg', ''), e)
                                return {} as IResponse
                            })
            },
        } as R
    }
}