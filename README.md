# MVVM React Example

## 项目简介
本项目是一个基于 React + TypeScript 的 MVVM（Model-View-ViewModel）架构示例，通过字典管理功能演示了如何在前端项目中实现 Presenter（ViewModel）、Model 和 View 的分离，提升代码的可维护性和可测试性。

## MVVM 架构介绍

### View（视图层）
* ⛳职责：

    * 负责渲染 UI（HTML、CSS、组件结构）
    * 响应用户交互（点击、输入等） 
    * 调用 ViewModel 暴露的接口 
    * 监听 ViewModel 提供的状态并渲染（通常通过 useState、useReducer、observer 等）
  
* ❌ 不负责：

    * 不处理业务逻辑 
    * 不持久化状态 
    * 不直接访问后端接口
  
### ViewModel（状态与行为中介层）
* 核心职责（推荐）：

    * 维护可被 View 观察的状态（表单数据、弹窗开关、选中项等）
    * 提供视图行为的控制接口（如 openModal、submitForm、refreshTable）
    * 对接 Model 层：获取、保存、更新业务数据 
    * 管理视图状态的变更逻辑（比如：一个异步更新后关闭弹窗并刷新列表） 
    * 可测试、可复用：尽可能与 React 组件解耦

* ⚠️ 它“控制”的是状态和行为逻辑，不是“控制 View 怎么渲染”。

* ✅ ViewModel 可以拥有：

    * 当前状态（state 或 reducer state） 
    * dispatch（更新状态） 
    * model（用于数据请求） 
    * 工具依赖（比如 form 实例、actionRef）—— 视图行为控制的中介

* ❌ 不负责：

    * 不直接渲染 UI 
    * 不处理 DOM 或生命周期（如 useEffect） 
    * 不负责组件的结构、样式、动画

### Model（业务数据层）
* ✅ 核心职责：

    * 封装业务数据访问逻辑（如 RESTful、GraphQL、IndexedDB 等） 
    * 返回干净的数据结构供 ViewModel 使用 
    * 与业务服务解耦（适合替换 mock、测试）

* ❌ 不负责： 

  * 不存储状态 
  * 不提供组件操作方法 
  * 不与 UI 或 ViewModel 紧耦合

**PS：除了View层以外，ViewModel、Model对象都不依赖于前端视图对象（例如：React），ViewModel可以是一个普通的类，Model也只是业务数据层对应依赖业务服务的对象，从而实现了业务逻辑与视图的解耦。**
## 架构说明

- **Model**：负责数据的获取与处理（如 `src/Dict/model.ts`）。
- **Presenter (ViewModel)**：负责业务逻辑和状态管理，不直接操作 UI（如 `src/Dict/presenter.ts`）。
- **View**：负责 UI 展示和用户交互（如 `src/Dict/index.tsx`），通常为 React 组件，通过 `useDictPresenter` hook 获取状态和操作方法（如 `src/Dict/hooks/useDictPresenter.ts`）。


## 目录结构

```
src/
  api/                      # 接口请求  
    dict.ts                 # 字典相关接口
  Dict/
    hooks/
      useDictPresenter.ts   # Presenter Hook
    index.tsx               # Vide 层   
    model.ts                # Model 层
    presenter.ts            # Presenter 层
    types.ts                # 类型定义
  index.tsx                 # 程序入口
```

## 主要依赖

- React 19
- TypeScript 4.9+
- Ant Design 5
- @ant-design/pro-components

## 安装与启动

```bash
npm install
npm start
```

## 参考资源
https://www.youtube.com/watch?v=f9oOe_vR7vA

