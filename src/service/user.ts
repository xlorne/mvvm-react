import {User} from "../model/user";
import React from "react";

export class UserService {

    userList: User[];

    constructor() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        this.userList = React.useMemo(() => {
            return [];
        },[]);
    }

    private generateUserId = () => {
        return this.userList.length>0? Math.max(...this.userList.map(user => user.id))+1:1;
    }

    public saveUser = (user: any) => {
        const currentUser = User.fromJson(user);
        const localUser = this.userList.find(item => user.id === item.id);
        if (localUser) {
            localUser.update(currentUser);
        }else{
            currentUser.setId(this.generateUserId());
            this.userList.push(currentUser);
        }
    }

    public removeUser = (id: number) => {
        const list = this.userList.filter(user => user.id !== id);
        this.userList.splice(0,  this.userList.length);
        this.userList.push(...list);
    }


   public fetchUsers = async (params: any) => {
        const name = params?.name;
        if (name) {
            const list = this.userList.filter(user => user.name === name);
            return {
                data: list.map(user=> user.toJson()),
                success: true
            }
        }
        return {
            data: this.userList.map(user=> user.toJson()),
            success: true
        }
    }

}
