# React 学习笔记

## React 基础

使用 react 脚手架开发

`npx create-react-app my-app`

React.createElement() 用于创建 react 元素
reactDOM.render() 方法负责渲染 react 元素到页面中（web 应用）

## JSX 使用

> JSX，是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模板语言，但它具有 JavaScript 的全部功能

- 基本使用
  - 比 createElement 学习成本更低， 提升开发效率，所以更推荐 jsx 写法
  ```javascript
  const element = <h1>Hello, world!</h1>
  ```
  但 jsx 不是标准的 es 语法，它是语法扩展，需要使用 babel 编译处理，才能咋浏览器环境中使用, 编译 jsx 的包是`@babel/preset-reset`
- react 元素名使用驼峰命名法。因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定
- react 推荐是使用() 进行包裹，这可以避免遇到自动插入分号陷阱
- jsx 样式处理，style 和 className, 推荐 className
- 事件绑定
  - on + 事件名称，使用驼峰命名法，事件对象 e,

## React 特点

- React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI
  ，根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。
- 完全利用 JS 语言自身的能力来编写 UI，而不是增强 HTML 功能（如 vue 中的模板之指令）

## React 组件介绍

特点

- 可复用性
- 独立性
- 可组合

创建方式

- 函数组件（无状态组件）
  - 约定一：函数名称大写字母开头
  - 约定二：必须有返回值
  ```javascript
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
  }
  ```
  - 渲染时将函数名作为标签名
- 类组件（有状态组件）
  - 必须大写字母开头
  - 应该继承 React.Component 父类，从而可以使用父类中提供的方法和属性
  - 必须提供 render 方法，且有返回值

> Tip：
>
> 组件应该抽离为独立 js 文件

### 有状态组件和无状态组件

1、初始化 state

2、setState() 修改状态

语法：`this.setState({/*要修改的数据*/})`

**事件处理程序的 this 指向**

render 中 this 指向组件实例，需要将事件处理程序中的 this 指向实例

- 箭头函数，()=> this.handle() 中的 this 指向 render 中的 this， 也就是组件实例，class 中的实例方法直接使用箭头函数

  ```javascript
  // 最简单的一种
  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }
  ```

- function.prototype.bind()
  ```javascript
  this.handle = this.handle.bind(this)
  ```

## 表单处理

### 受控组件

受控组件，表单元素的值被 react 中的 state 控制

```javascript
<input
  value={this.state.value}
  onChange={(e) => this.setState({ value: e.target.value })}
/>
```

统一处理 input select checkbox 多种受控组件，提供 name 属性表示状态名称

```javascript
handleChange = (e) => {
  const target = e.target
  const value = target.type === 'checkbox' ? target.checked : target.value
  const name = target.name
  this.setState({
    [name]: value,
  })
}
```

### 非受控组件

通过 ref 获取，

```javascript
// constructor 中初始化
 React.createRef()
//  为input 添加ref属性
<input ref={this.txtRef} type="text"/>
// 通过 this.txtRef.current.value获取到input的值
console.log(this.txtRef.current.value)
```

不建议使用 ref，毕竟是操作 DOM

## 组件进阶

### 组件通讯

- props 接收组件传递过来的数据，

  - 可以传递任意类型的数据，传递 jsx、函数、字符串、数字等等
  - 只读
  - constructor 中的 this 想要读取 props 的话必须先将 props 传递给父级

  ```javascript
  constructor(props){
  super(props)
  // 可以使用this.props 啦
  }

  ```

- 父传子，props
- 子传父，props 传函数对象， 在子组件中调用 this.props.methos('要传递的数据')
- 兄弟组件， 状态提升到父级组件

跨组件传递：Context
调用 React.createContext() 创建的 Provider 和 Consumer 组件

> Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据

```javascript
const { Provider, Consumer } = React.createContext()

// 父组件里提供数据
<Provider value={this.props.msg}>
  <ConcatComp getMsg={this.getChildMsg} />
</Provider>
// 子组件或孙组件接收数据
<Consumer>{(data) => <span>{data}</span>}</Consumer>


```

### children 属性

表示组件标签中的子节点， 值可以任意的，文本、组件、甚至是函数
`this.props.children` 访问到

### props 深入

- props 校验
  - `yarn add prop-types`
    https://www.npmjs.com/package/prop-types
  ```javascript
  class ValidProps extends React.Component {
    render() {
      return <h1>{this.props.msg}</h1>
    }
  }
  ValidProps.propTypes = {
    msg: PropTypes.string,
  }
  ```
- props 默认值， defaultProps 可以为 Class 组件添加默认 props
  ```javascript
  ValidProps.defaultProps = {
    msg: 'hello React',
  }
  ```

## 组件生命周期

只有类组件才有生命周期

### 生命周期的三个阶段

![](https://img-blog.csdnimg.cn/3566de53780f42ea9bedd24905c2cd87.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6ZOB5p-xZWY=,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 初始化

页面加载时就开始执行，执行顺序如下：

- constructor，初始化 state, 为事件处理程序绑定 this
- render（渲染），渲染 UI，注意不能调用 setState（创建时更新时都会执行）
- componentDidMount（渲染完成后立即触发），发送网络请求， DOM 操作等，如果要使用 setState，必须要在 if 语句中，如果你的渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，你可以使用此方式处理

#### 更新阶段

render（重新渲染） 执行的三种情况：

- 状态更新，组件状态发生改变
- 执行 setState 时
- forceUpdate()， 强制更新

#### 卸载阶段

执行 componentWillUnmount 钩子函数,如果添加了订阅，请不要忘记在 componentWillUnmount() 里取消订阅，执行清理工作，比如清除定时器等等

### 不常用钩子函数

![](https://img-blog.csdnimg.cn/5e70400dc12247419fe80c9e5036247a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6ZOB5p-xZWY=,size_20,color_FFFFFF,t_70,g_se,x_16)

## render-props 和 高阶组件

### 组件复用

两种方法：

1、render props 模式，把 prop 设置为函数类型，返回值作为内容
推荐使用 children 代替 render 属性

[示例代码](./src/example/render-props.js)

2、高阶组件（HOC，Hight-Order Component）

[示例代码](./src/example/high-level.js)

目的：实现状态逻辑复用  
采用包装（装饰）模式

```javascript
const EnhancedComponent = withHOC(WrappedComponent)
```

## React 原理

- setState 是异步更新的，无论调用多少次 setState， 都只会执行一次 render 重新渲染

[示例代码](./src/example/set-state.js)

```javascript
语法：
（setState(updater, callback)）
// 示例
this.setState((state, props)=>{
// state 始终是最新的state值
}, ()=>{
  // 状态更新后立即执行
})
```

- jsx 语法转化过程，实际上是 createElement 方法的语法糖，会被@babel/preset-react 插件编译为 createElement() 方法，createElement() 最终生成 React 元素，也就是一个描述页面内容的 js 对象

### 组件更新机制

setState 方法调用之后

- 父组件重新渲染时，也会重新渲染子组件，只会更新当前组件子树

## 组件性能优化

- 减轻 state，只存储与组件渲染相关的数据，不用做渲染的数据不应该放在 state 中，应该放在 this 中
- 避免不必要的重新渲染，根据组件更新机制，父组件更新子组件也会重新渲染，以及自身 state 发生改变时也会重新渲染，应该使用 shouldComponentUpdate(nextProps, nextState)，数据没改变的话返回 false
- [示例代码](./src/example/optimize.js)
  要注意 setState 时不能去直接修改，要创建一个新数据，再赋值给 state

## 虚拟 DOM 和 diff 算法

虚拟 DOM，本质上是 js 对象，用于描述真实 DOM  
虚拟 DOM 真正的意义在于脱离浏览器的束缚，为跨平台提供帮助

## React 路由基础

安装：

`yarn add react-router-dom`

[使用教程](https://reactrouter.com/docs/en/v6/getting-started/tutorial)

- BrowserRouter 组件，包裹页面
- Link 组件，导航菜单链接
- Route 组件，配置路由规则， 必须放在 Routes 组件下

编程式导航  
对于`react-router-dom@6.x.x`
[示例代码](./src/example/router.js)

```javascript
const navigate = useNavigate()
const handleLogin = () => {
  navigate('/home')
}
```
