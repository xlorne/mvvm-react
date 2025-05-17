import React from "react";
import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {Button, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Tree, TreeProps} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {useDictPresenter} from "./hooks/useDictPresenter";

const DictPage = () => {

    // 表格的渲染对象，属于UI组件控制对象，不由Presenter控制，Presenter实现表格的更新通过状态控制，挂在能力对应第一个useEffect
    const actionRef = React.useRef<ActionType>(null);

    // 表单的渲染对象，属于UI组件控制对象，不由Presenter控制，Presenter实现表单的更新通过状态控制，挂在能力对应第二个useEffect
    const [form] = Form.useForm();

    // 通过hooks获取state状态数据与presenter对象
    const {state, presenter} = useDictPresenter();

    // 当组件挂载时，加载标签树数据
    React.useEffect(() => {
        presenter.loadLabelTree();
        presenter.updateCurrentLabel([]);
    }, []);

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        presenter.updateCurrentLabel(selectedKeys as string[]);
    };

    React.useEffect(() => {
        actionRef.current?.reload();
    }, [state.tableRefreshVersion]);

    React.useEffect(() => {
        if (state.currentEditValue) {
            form.setFieldsValue(state.currentEditValue)
        } else {
            form.resetFields();
        }
    }, [form, state.currentEditValue]);

    const columns: ProColumns[] = [
        {
            title: '编号',
            dataIndex: 'id',
            search: false
        },
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '编码',
            dataIndex: 'code',
        },
        {
            title: '状态',
            dataIndex: 'state',
            search: false,
            valueEnum: {
                0: '禁用',
                1: '启用'
            }
        },
        {
            title: '备注',
            dataIndex: 'commit',
            search: false,
            ellipsis: true,
            copyable: true,
        },
        {
            title: '备选字段1',
            search: false,
            dataIndex: 'value1',
        },
        {
            title: '备选字段2',
            search: false,
            dataIndex: 'value2',
        },
        {
            title: '备选字段3',
            search: false,
            dataIndex: 'value3',
        },
        {
            title: '操作',
            width: 180,
            key: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    href={"#"}
                    key="edit"
                    onClick={() => {
                        presenter.showValueEditModal(record);
                    }}>编辑</a>,
                <a
                    key="add"
                    href={"#"}
                    onClick={() => {
                        presenter.showValueAddModal();
                    }}
                >
                    添加子项
                </a>,
                <Popconfirm
                    title={"确定删除吗？"}
                    description={"删除后不可恢复，请谨慎操作！"}
                    onConfirm={() => {
                        presenter.deleteValue(record);
                    }}
                >
                    <a>删除</a>
                </Popconfirm>
            ],
        },
    ];

    return (
        <PageContainer>
            <Row>
                <Col span={4}>
                    {state.labelTreeData.length > 0 && (
                        <Tree
                            showLine
                            switcherIcon={<DownOutlined/>}
                            defaultExpandAll={true}
                            onSelect={onSelect}
                            treeData={state.labelTreeData}
                        />
                    )}
                </Col>
                <Col span={20}>
                    <ProTable
                        actionRef={actionRef}
                        toolBarRender={() => {
                            return [
                                <Button
                                    type={"primary"}
                                    onClick={() => {
                                        presenter.showValueAddModal();
                                    }}
                                >新增</Button>
                            ]
                        }}
                        columns={columns}
                        request={async (params, sort, filter) => {
                            return presenter.searchValueTable(params, sort, filter);
                        }}
                    />
                </Col>
            </Row>

            <Modal
                open={state.valueAddVisible}
                title={"添加字段数据"}
                destroyOnHidden={true}
                onClose={() => {
                    presenter.hideValueAddModal();
                }}
                onCancel={() => {
                    presenter.hideValueAddModal();
                }}
                onOk={() => {
                    form.submit();
                }}
            >
                <Form
                    form={form}
                    layout={"vertical"}
                    onFinish={(values) => {
                        presenter.updateValue(values);
                    }}
                >
                    <Form.Item
                        name={"name"}
                        label={"名称"}
                        rules={[
                            {
                                required: true,
                                message: "请输入名称"
                            }
                        ]}
                    >
                        <Input style={{width: "100%"}}/>
                    </Form.Item>

                    <Form.Item
                        name={"commit"}
                        label={"备注"}
                    >
                        <Input.TextArea style={{width: "100%"}}/>
                    </Form.Item>

                </Form>

            </Modal>

            <Modal
                open={state.valueEditVisible}
                title={"修改字段数据"}
                destroyOnHidden={true}
                onClose={() => {
                    presenter.hideValueEditModal();
                }}
                onCancel={() => {
                    presenter.hideValueEditModal();
                }}
                onOk={() => {
                    form.submit();
                }}
            >
                <Form
                    form={form}
                    layout={"vertical"}
                    onFinish={(values) => {
                        presenter.updateValue(values);
                    }}
                >

                    <Form.Item
                        name={"id"}
                        label={"编号"}
                        hidden={true}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name={"name"}
                        label={"名称"}
                        rules={[
                            {
                                required: true,
                                message: "请输入名称"
                            }
                        ]}
                    >
                        <Input style={{width: "100%"}}/>
                    </Form.Item>

                    <Form.Item
                        name={"commit"}
                        label={"备注"}
                    >
                        <Input.TextArea style={{width: "100%"}}/>
                    </Form.Item>

                    <Form.Item
                        name={"order"}
                        label={"排序"}
                    >
                        <InputNumber style={{width: "100%"}}/>
                    </Form.Item>

                </Form>

            </Modal>

        </PageContainer>
    )
}

export default DictPage