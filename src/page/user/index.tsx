import React from "react";
import {ModalForm, ProFormDigit, ProFormText, ProTable} from "@ant-design/pro-components";
import {Button, Popconfirm, Space} from "antd";
import userPresenter from "../../presenter/user";
import {User} from "../../model/user";


const UserComponent: React.FC = (props) => {

    const {
        form,
        modalVisible,
        modalTitle,
        actionRef,

        handleUser,
        removeUser,
        fetchUsers,
        showAddModal,
        hideModal,
        showEditModal,
    } = userPresenter();

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            valueType: 'indexBorder',
            search: false,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            valueType: 'text',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            valueType: 'digit',
            key: 'age',
            search: false,
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            valueType: 'text',
            search: false,
        },
        {
            title: '操作',
            valueType: 'option',
            render: (_: any, record: User) => (
                <Space>
                    <a key="edit" onClick={() => {
                        showEditModal(record);
                    }}>编辑</a>

                    <Popconfirm
                        title="确认要删除吗？"
                        key="delete"
                        onConfirm={() => {
                            removeUser(record.id);
                        }}
                    >
                        <a key="delete">删除</a>
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
                        <Button key="button" onClick={() => showAddModal()} type="primary">添加用户</Button>
                    ]
                }
                request={fetchUsers}
                actionRef={actionRef}
                columns={columns}
                rowKey="id"
                headerTitle="用户列表"
            />

            <ModalForm
                form={form}
                title={modalTitle}
                open={modalVisible}
                modalProps={{
                    destroyOnClose: true,
                    onCancel: () => hideModal(),
                }}
                onFinish={async (values) => {
                    return handleUser(values);
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
