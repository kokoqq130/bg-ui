## 开发组件库
在对bnq-sys-react-component（下面简称bnqComponent）组件库的开发过程中主要是在
> [http://git.bnq.com.cn:9999/bnq-react-component/bnq-sys-react-component/tree/component-store](http://git.bnq.com.cn:9999/bnq-react-component/bnq-sys-react-component/tree/component-store)

这个项目下进行开发
### 项目结构整体说明
![项目结构](http://git.bnq.com.cn:9999/bnq-react-component/bnq-sys-react-component/raw/63d1f586f4bf30bc7364125e0f0e8af6741cc053/docs/bnq-sys-%20react-component.png)

### 启动项目
- 在项目更目录下yarn
- npm run start

### 菜单配置
- 在demo/config/config.json中的menu下编写组件菜单的基础信息，包括组件名称，组件文档的url地址

### 路由配置
- 在demo/src/router/RouterConfig.js中配置一个新页面Demo1，url使用菜单配置中配置的url

### 组件预览
1. 在package/bnq-component-ui/component下创建文件夹Demo1，并在其中创建index.jsx，编写一个demo组件
2. 在demo/src/component/pages/components下按照范例创建一个文件夹作为（示例），并将路由中配置的路由地址指向此组件
3. 示例文件夹中应包含页面组件及demo组件，其中页面组件可以按照范例编写，demo组件则需要引用步骤1中编写好的组件

### 组件编写规范
- 严格按照eslint规范标准编写
- 编写一个完整的组件需要有如下几个部分
    - 核心代码
        - 执行代码
        - 注释（用于生成api文档）
    - readme文档
> 编写规范可参考AppBar示例

