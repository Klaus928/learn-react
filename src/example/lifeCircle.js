import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    // 初始化
    console.log('初始化state, 为事件处理程序绑定this')
  }
  componentDidMount() {
    console.log('发送网络请求， DOM操作等')
    const title = document.getElementById('title')
    title.style.color = '#f00'
  }
  render() {
    // 不要调用setState 否则会造成递归更新
    console.log('渲染UI，注意不能调用setState')
    return <h1 id="title">{this.props.msg}</h1>
  }
}
export default App
