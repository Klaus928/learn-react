import React from 'react'
class State extends React.Component {
  state = {
    count: 0,
  }
  handleClick = () => {
    this.setState(
      (state) => {
        return {
          count: state.count + 1,
        }
      },
      () => {
        // 在这里可以使用更新后的state 或dom操作
        console.log(this.state.count)
        console.log(document.getElementById('test').innerHTML)
      }
    )
  }
  render() {
    return (
      <div>
        <p id="test">count: {this.state.count}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
export default State
