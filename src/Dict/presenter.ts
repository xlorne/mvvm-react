import {DictApi, DictState, Dispatch} from "./types";

/**
 *  DictPresenter MVVM对象中ViewModel对象
 *  Presenter: 将UI控制对象交给View，Presenter 只做状态和业务逻辑的处理。设计到UI的界面数据刷新也通过数据状态来控制
 */
export class DictPresenter {

    // 更新数据状态的dispatch函数
    private readonly dispatch: Dispatch<DictState>;
    // 传入的Model对象
    private readonly api: DictApi;
    // 当前的数据状态，由于DictPresenter是通过React.useRef对象来保存的，为了保持数据状态的同步，需要通过updateState函数来更新。
    private state: DictState;

    // 通过构造函数传入数据状态和Model对象
    constructor(state: DictState, dispatch: Dispatch<DictState>, api: DictApi) {
        this.state = state;
        this.dispatch = dispatch;
        this.api = api;
        console.log('DictPresenter initialized');
    }

    // 更新状态数据
    updateState = (newState: DictState) => {
        this.state = newState;
    }

    // 刷新标签类型树数据
    loadLabelTree = () => {
        this.api.loadLabelTree().then(data => {
            this.dispatch((prevState) => {
                return {
                    ...prevState,
                    labelTreeData: data
                }
            })
        });
    }

    // 显示标签添加对话框
    showValueAddModal = () => {
        this.dispatch((prevState) => {
            return {
                ...prevState,
                valueAddVisible: true
            }
        });
    }

    // 隐藏标签添加对话框
    hideValueAddModal = () => {
        this.dispatch((prevState) => {
            return {
                ...prevState,
                valueAddVisible: false
            }
        })
    }

    // 显示标签编辑对话框
    showValueEditModal = (record: DictState) => {
        this.dispatch((prevState) => {
            return {
                ...prevState,
                valueEditVisible: true,
                currentEditValue: record
            }
        })
    }

    // 隐藏标签编辑对话框
    hideValueEditModal = () => {
        this.dispatch((prevState) => {
            return {
                ...prevState,
                valueEditVisible: false,
                currentEditValue: null
            }
        })
    }

    // 删除标签数据
    deleteValue = (record: DictState) => {
        this.api.deleteValue(record);
        this.refreshValueTable();
    }

    // 更新标签数据
    updateValue = (record: DictState) => {
        this.api.updateValue(record);
        this.hideValueAddModal();
        this.hideValueEditModal();
        this.refreshValueTable();
    }

    // 刷新标签表格数据
    refreshValueTable = () => {
        this.dispatch((prevState) => {
            return {
                ...prevState,
                tableRefreshVersion: prevState.tableRefreshVersion + 1
            }
        })
    }

    // 设置当前点击的标签数据，然后刷新表格数据
    updateCurrentLabel = (selected: string[]) => {
        if (selected && selected.length > 0) {
            const label = selected[0];
            this.dispatch((prevState) => {
                return {
                    ...prevState,
                    currentLabel: label
                }
            });
            this.refreshValueTable();
        }
    }

    // 标签表格数据加载函数
    public searchValueTable = (params: any, sort: any, filter: any) => {
        // 添加当前标签数据到查询参数中
        const searchParams = {
            ...params,
            currentLabel: this.state.currentLabel
        }

        return this.api.loadValueTable(searchParams, sort, filter);
    }
}
