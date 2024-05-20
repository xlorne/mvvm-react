import {User} from "../model/user";
import {useState} from "react";

const userPresenter = () =>{

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userList,setUserList] = useState<User[]>([]);

    const getUser = (id:number) => {
        return userList.find(user => user.id === id);
    }

    const addUser = (user:any) => {
        const currentUser = User.fromJson(user);
        const localUser = getUser(currentUser.id);
        if(localUser){
            localUser.update(currentUser);
            return;
        }
        setUserList([...userList,currentUser]);
    }

    const removeUser = (id:number) => {
        setUserList(userList.filter(user => user.id !== id));
    }

    return {
        userList,
        addUser,
        removeUser
    }
}

export default userPresenter;
