# MVVM REACT Example

## 项目简介
本项目是一个基于 React + TypeScript 的 MVVM（Model-View-ViewModel）架构示例，演示了如何在前端项目中实现 Presenter（ViewModel）、Model 和 View 的分离，提升代码的可维护性和可测试性。

## 架构说明

- **Model**：负责数据的获取与处理（如 `src/Dict/model.ts`）。
- **Presenter (ViewModel)**：负责业务逻辑和状态管理，不直接操作 UI（如 `src/Dict/presenter.ts`）。
- **View**：负责 UI 展示和用户交互，通常为 React 组件，通过 `useDictPresenter` hook 获取状态和操作方法（如 `src/Dict/hooks/useDictPresenter.ts`）。

## 目录结构

```
src/
  Dict/
    hooks/
      useDictPresenter.ts   # Presenter Hook
    model.ts                # Model 层
    presenter.ts            # Presenter 层
    types.ts                # 类型定义
  App.tsx                   # 入口视图
```

## 主要依赖

- React 19
- TypeScript 4.9+
- Ant Design 5
- @ant-design/pro-components
- dayjs

## 安装与启动

```bash
npm install
npm start
```

## 参考资源
https://www.youtube.com/watch?v=f9oOe_vR7vA

