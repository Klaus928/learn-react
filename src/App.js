import logo from './logo.svg'
import './App.css'
import React from 'react'
const songs = Array(9).fill({
  title: 'hhh',
  description: 'descroption',
})
// function component
function App(props) {
  return (
    <div className="App">
      <ul>
        {songs.map((item, index) => {
          return (
            <li key={index}>
              {item.title}:{item.description}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
// class component
export class Hello extends React.Component {
  // constructor(){
  //   super()
  //   this.state = {
  //     count: 0
  //   }
  // }
  state = {
    count: 0,
  }
  handleClick(e) {
    // 使用事件对象
    e.preventDefault()
    console.log('没有this', e)
  }
  render() {
    return (
      <div>
        <h1>hello world</h1>
        <button onClick={this.handleClick}>click</button>
        <a onClick={this.handleClick} href="https://www.baidu.com/">
          baidu.com
        </a>
      </div>
    )
  }
}

// 有状态组件，count++案例
// 定义 state
// 使用this.setState修改状态
export class StateComp extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
    // this.handleClick = this.handleClick.bind(this)
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
export default App

// 表单处理  双向绑定
// 受控组件
// checkbox prop: checked
// input textarea select prop: value
// 使用同一个事件处理程序处理不同的表单元素
export class ControlComp extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 'hello',
      selectVal: 'sz',
      checkVal: true,
    }
  }
  handleChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  render() {
    return (
      <div>
        <h1>输入框值：{this.state.value}</h1>
        <input
          name="value"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <h1>下拉框选中值：{this.state.selectVal}</h1>
        <select
          name="selectVal"
          value={this.state.selectVal}
          onChange={this.handleChange}
        >
          <option value="sh">上海</option>
          <option value="bj">北京</option>
          <option value="sz">深圳</option>
        </select>
        <h1>复选框值：{JSON.stringify(this.state.checkVal)}</h1>
        <input
          type="checkbox"
          name="checkVal"
          checked={this.state.checkVal}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
