import {DictApi} from "./types";
import {data} from "../api/dict";

/**
 * Model层接口实现
 * DictApiImpl 实现了DictApi接口，提供了数据的增删改查操作
 * 这里使用了模拟数据，实际应用中可以使用axios等库来请求后端接口
 */
export class DictApiImpl implements DictApi {

    updateLabel(params: any): void {
        console.log('updateLabel:', params);
    }

    updateValue(params: any): void {
        console.log('updateValue:', params);
    }

    deleteLabel(params: any): void {
        console.log('deleteLabel:', params);
    }

    deleteValue(params: any): void {
        console.log('deleteValue:', params);
    }

    loadLabelTree(): Promise<any> {
        return Promise.resolve(data.labels);
    }

    loadValueTable(params: any, sort: any, filter: any): Promise<any> {
        const list = data.values;
        console.log('search:', params,sort,filter);
        return Promise.resolve({
            data:list,
            total: list.length,
        });
    }

}