// 随机数示例： 优化

import React from 'react'
class RandomNumber extends React.Component {
  state = {
    num: null,
  }
  handleRandom = () => {
    this.setState(() => ({ num: Math.floor(Math.random() * 3) }))
  }
  // 阻止不必要的渲染
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.num !== this.state.num
  }
  render() {
    console.log('render')
    return (
      <div>
        <h1>随机数: {this.state.num}</h1>
        <button onClick={this.handleRandom}>生成随机数</button>
      </div>
    )
  }
}
export default RandomNumber
