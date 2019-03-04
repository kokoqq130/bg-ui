# 使用说明
back-component是基于react，antd进行封装的组件库，主要服务于后台系统。
## 使用组件库
### 切换npm地址
- 建议使用nrm维护npm地址库，使用方式可参考 https://blog.csdn.net/anway12138/article/details/79455224

### 安装组件库
    yarn add back-component
> 安装组件库之前需要安装如下依赖，安装过程也会有提示
-  "antd": ">=3.9.0",
-  "react": ">=16.0.0",
-  "react-dom": ">=16.0.0",
-  "classnames": ">=2.2.6",
-  "axios": ">=0.18.0",
-  "moment": ">=2.24.0",
-  "prop-types": ">=15.6.2"
### 使用组件库
#### 引用示例：

    import Common1 from 'back-component/lib/Common1';
    ReactDOM.render(<Common1 />, mountNode);
    
    // 引入样式：    
    import 'back-component/lib/Common1/index.css';
#### 使用babel-plugin-import按需加载
假如项目中使用babel，则可以通过安装 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)来进行按需加载，假如这个插件后。你可以这么写：
    
    import { Common1 } from 'back-component'
    
##### 配置babel-plugin-import

    // .babelrc 
    "plugins": [
        ["import", {"libraryName": "antd", "libraryDirectory": "lib"}, "ant"}],
        ["import", {"libraryName": "back-component", "libraryDirectory": "lib", "camel2DashComponentName": false }, "back-component"],
    ]

#### 打包less:
组件库导出样式为直出的less文件，需要在webpack配置中增加less-loader进行打包



