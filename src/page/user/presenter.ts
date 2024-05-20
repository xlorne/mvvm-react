import {User} from "../../model/user";

export interface Presenter {
    form: any;
    modalVisible: boolean;
    modalTitle: string;
    actionRef: any;
    handleUser: (user: any) => boolean;
    removeUser: (id: number) => void;
    fetchUsers: (params: any) => Promise<any>;
    showAddModal: () => void;
    hideModal: () => void;
    showEditModal: (user: User) => void;
}
