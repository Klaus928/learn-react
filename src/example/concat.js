// 组件间通讯
// 1、父传子 props
// 2、子传父 传函数参数给子组件，回调函数
// 3、兄弟组件之间传递 状态提升，在父组件中提供共享状态
// context 实现跨组件通讯， 提供两个组件  Provider, Consumer ，提供数据和接收数据
import React from 'react'
// 两个组件
const { Provider, Consumer } = React.createContext()

// children 属性
const SubChild = (props) => {
  return (
    <h1>
      <Consumer>{(data) => <span>{data}</span>}</Consumer>
      {props.children}
    </h1>
  )
}
class ConcatComp extends React.Component {
  handleClick = () => {
    this.props.getMsg('yes')
  }
  render() {
    return (
      <div>
        <SubChild>hello</SubChild>
        <button onClick={this.handleClick}>click me and check console</button>
      </div>
    )
  }
}
export class Father extends React.Component {
  getChildMsg = (msg) => {
    console.log('子组件传过来的数据', msg)
  }
  render() {
    return (
      <Provider value={this.props.msg}>
        <ConcatComp getMsg={this.getChildMsg} />
      </Provider>
    )
  }
}
