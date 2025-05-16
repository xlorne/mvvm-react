/**
 * Dispatch对象
 */
export type Dispatch<T> = (updater: (prevState: T) => T) => void;

/**
 * 数据状态类型的定义
 */
export interface DictState {
    currentLabel: string;
    labelEditVisible: boolean;
    labelAddVisible: boolean;
    valueEditVisible: boolean;
    valueAddVisible: boolean;

    currentEditValue: any;
    tableRefreshVersion: number;

    labelTreeData: any[];
}

/**
 * Model层接口定义，防止接口层逻辑污染Presenter的逻辑
 */
export interface DictApi {

    loadLabelTree: () => Promise<any>;

    loadValueTable: (params: any, sort: any, filter: any) => Promise<any>;

    updateLabel: (params: any) => void;

    deleteLabel: (params: any) => void;

    updateValue: (params: any) => void;

    deleteValue: (params: any) => void;
}
