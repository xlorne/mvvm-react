import {User} from "../model/user";
import React from "react";
import {ActionType, ProForm} from "@ant-design/pro-components";
import {UserPresenter} from "../page/user/user.presenter";

const userPresenter = ():UserPresenter => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userList, setUserList] = React.useState<User[]>([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = ProForm.useForm();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const actionRef = React.useRef<ActionType>();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalVisible, setModalVisible] = React.useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalTitle, setModalTitle] = React.useState('');

    const hideModal = () => {
        setModalVisible(false);
    }

    const showAddModal = () => {
        setModalTitle('新增用户');
        setModalVisible(true);
    }

    const showEditModal = (user: User) => {
        setModalTitle('编辑用户');
        form.setFieldsValue(user);
        setModalVisible(true);
    }

    const handleUser = (user: any) => {
        const currentUser = User.fromJson(user);
        const localUser = userList.find(item => user.id === item.id);
        if (localUser) {
            localUser.update(currentUser);
        }else{
            setUserList([...userList, currentUser]);
        }
        setModalVisible(false);
        actionRef.current?.reload();
        return true;
    }

    const removeUser = (id: number) => {
        setUserList(userList.filter(user => user.id !== id));
        actionRef.current?.reload();
    }

    const fetchUsers = async (params: any) => {
        const name = params?.name;
        if (name) {
            const user = userList.filter(user => user.name === name);
            return {
                data: user,
                success: true
            }
        }
        return {
            data: userList,
            success: true
        }
    }

    return {
        form,
        actionRef,
        modalVisible,
        modalTitle,

        handleUser,
        removeUser,
        fetchUsers,
        showAddModal,
        hideModal,
        showEditModal,
    }
}

export default userPresenter;
