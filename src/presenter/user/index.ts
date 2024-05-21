import {User} from "../../model/user";
import React from "react";
import {ActionType, ProForm} from "@ant-design/pro-components";
import {Presenter} from "../../component/user/presenter";
import {UserService} from "../../service/user";

const userPresenter = ():Presenter => {

    const userService = new UserService();

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
        userService.saveUser(user);
        setModalVisible(false);
        actionRef.current?.reload();
        return true;
    }

    const removeUser = (id: number) => {
        userService.removeUser(id);
        actionRef.current?.reload();
    }

    const fetchUsers = async (params: any) => {
        return userService.fetchUsers(params);
    }

    return {
        form,
        actionRef,
        modalVisible,
        modalTitle,

        hideModal,
        handleUser,
        removeUser,
        fetchUsers,
        showAddModal,
        showEditModal,
    }
}

export default userPresenter;
