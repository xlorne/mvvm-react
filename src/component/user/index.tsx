import React from "react";
import {ModalForm, ProFormDigit, ProFormText, ProTable} from "@ant-design/pro-components";
import {Button, Popconfirm, Space} from "antd";
import {User} from "../../model/user";
import {Presenter} from "./presenter";
import "./index.css";

export interface UserComponentProps {
    userPresenter(): Presenter;
}

export const UserComponent: React.FC<UserComponentProps> = (props) => {

    const presenter = props.userPresenter();

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            valueType: 'text',
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
                    <button
                        className="click-btn"
                        key="edit"
                        onClick={() => {
                            presenter.showEditModal(record);
                            return false;
                        }}>编辑</button>

                    <Popconfirm
                        title="确认要删除吗？"
                        key="delete"
                        onConfirm={() => {
                            presenter.removeUser(record.id);
                        }}
                    >
                        <button
                            className="click-btn"
                            key="delete"
                        >删除</button>
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
                        <Button key="button" onClick={() => presenter.showAddModal()} type="primary">添加用户</Button>
                    ]
                }
                request={presenter.fetchUsers}
                actionRef={presenter.actionRef}
                columns={columns}
                rowKey="id"
                headerTitle="用户列表"
            />

            <ModalForm
                form={presenter.form}
                title={presenter.modalTitle}
                open={presenter.modalVisible}
                modalProps={{
                    destroyOnClose: true,
                    onCancel: () => presenter.hideModal(),
                }}
                onFinish={async (values) => {
                    return presenter.handleUser(values);
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
