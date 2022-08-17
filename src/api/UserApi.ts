export interface IUser{
    id: number;
    name: string;
}

export default {
    getSelfInfo(): Promise<IUser>{
        return Promise.resolve({
            id: 1,
            name: 'zs'
        })
    }
}

