import React from "react";
import {ModalForm, ProForm, ProFormDigit, ProFormText, ProTable} from "@ant-design/pro-components";
import {Button, Popconfirm, Space} from "antd";
import userPresenter from "../../presenter/user";
import {User} from "../../model/user";

const UserComponent: React.FC = (props) => {

    const {userList, addUser, removeUser} = userPresenter();

    const [form] = ProForm.useForm();

    const [modalVisible, setModalVisible] = React.useState(false);

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            search: false,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            search: false,
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            search: false,
        },
        {
            title: '操作',
            valueType: 'option',
            render: (_: any, record: User) => (
                <Space size="middle">
                    <a key={"edit"} onClick={()=>{
                        for (let key in record){
                            // @ts-ignore
                            form.setFieldsValue({[key]:record[key]});
                        }
                        setModalVisible(true);
                    }}>编辑</a>
                    <Popconfirm
                        title="确认要删除吗？"
                        onConfirm={() => {
                            removeUser(record.id);
                        }}
                    >
                        <a key={"delete"}>删除</a>
                    </Popconfirm>

                </Space>
            ),
        }
    ];

    return (
        <>
            <ProTable
                toolBarRender={
                    () => [
                        <Button key="button" onClick={() => setModalVisible(true)} type="primary">添加用户</Button>
                    ]
                }
                dataSource={userList}
                columns={columns}
                rowKey="id"
                headerTitle="用户列表"
            />

            <ModalForm
                form={form}
                title="添加用户"
                open={modalVisible}
                modalProps={{
                    destroyOnClose: true,
                    onCancel: () => setModalVisible(false),
                }}
                onFinish={async (values) => {
                    addUser(values);
                    setModalVisible(false);
                    return true;
                }}
            >
                <ProFormText
                    name="id"
                    hidden={true}
                />

                <ProFormText
                    rules={[
                        {
                            required: true,
                            message: '姓名为必填项',
                        },
                    ]}
                    label="姓名"
                    name="name"
                />

                <ProFormDigit
                    rules={[
                        {
                            required: true,
                            message: '年龄为必填项',
                        },
                    ]}
                    fieldProps={{
                        precision: 0,
                        min: 1,
                        max: 150,
                    }}
                    label="年龄"
                    name="age"/>

                <ProFormText
                    rules={[
                        {
                            required: true,
                            message: '地址为必填项',
                        },
                    ]}
                    label="地址"
                    name="address"/>

            </ModalForm>
        </>
    );
}

export default UserComponent;
