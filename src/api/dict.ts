import {TreeDataNode} from "antd";

const labels: TreeDataNode[] = [
    {
        title: '人员属性',
        key: '0',
        children: [
            {
                title: '性别',
                key: '0-0',
            },
            {
                title: '民族',
                key: '0-1',
            },
            {
                title: '国家',
                key: '0-2',
            },
        ],
    },
    {
        title: '学校属性',
        key: '1',
        children: [
            {
                title: '学历',
                key: '1-0',
            },
        ],
    },
    {
        title: '岗位级别',
        key: '2',
        children: [
            {
                title: '职级',
                key: '2-0',
            },
            {
                title: '岗级',
                key: '2-1',
            },
        ],
    },
];



const values= [
    {
        id:1,
        name: '汉族',
        code: '01',
        state: 1,
        commit:'',
        value1: '',
        value2: '',
        value3: '',
    },
    {
        id:2,
        name: '维吾尔族',
        code: '02',
        state: 1,
        commit:'',
        value1: '',
        value2: '',
        value3: '',
    },
    {
        id:3,
        name: '回族',
        code: '03',
        state: 1,
        commit:'',
        value1: '',
        value2: '',
        value3: '',
    },
    {
        id:4,
        name: '壮族',
        code: '04',
        state: 1,
        commit:'',
        value1: '',
        value2: '',
        value3: '',
    },
];


export const data = {
    labels,
    values
}