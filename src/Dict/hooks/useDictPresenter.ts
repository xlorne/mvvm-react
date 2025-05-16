import React from "react";
import {DictPresenter} from "../presenter";
import {DictApiImpl} from "../model";
import {DictState} from "../types";

const initialState: DictState = {
    currentLabel: '',
    labelAddVisible: false,
    valueAddVisible: false,
    labelEditVisible: false,
    valueEditVisible: false,
    currentEditValue: null,
    tableRefreshVersion: 0,
    labelTreeData: [],
};

/**
 *  useDictPresenter hook
 *  创建 DictPresenter 实例，并缓存到React.useRef对象，返回数据状态state和 presenter
 */
export function useDictPresenter() {
    const [state, dispatch] = React.useState<DictState>(initialState);

    const presenterRef = React.useRef<DictPresenter>(null);

    // 如果 presenterRef.current 为空，则创建一个新的 DictPresenter 实例
    if (!presenterRef.current) {
        presenterRef.current = new DictPresenter(state, dispatch, new DictApiImpl());
    }

    // 当 state 发生变化时，更新 presenter 的状态
    React.useEffect(() => {
        presenterRef.current?.updateState(state);
    }, [state])

    // 当组件挂载时，加载标签树数据
    React.useEffect(() => {
        presenterRef.current?.loadLabelTree();
        presenterRef.current?.updateCurrentLabel([]);
    }, []);

    return {
        state,
        presenter: presenterRef.current,
    };
}