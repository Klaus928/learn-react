import React from 'react'
import PropType from 'prop-types'
// 组件复用
// render props
// 高阶组件
// 将需要复用的状态放到回调函数中作为参数
// 函数返回值作为UI内容/使用children更加直观（推荐）
class Mouse extends React.Component {
  state = {
    x: 0,
    y: 0,
  }
  handleMouseMove = (e) => {
    const { clientX, clientY } = e
    this.setState({
      x: clientX,
      y: clientY,
    })
  }
  componentDidMount() {
    // 要记得移除事件绑定
    window.addEventListener('mousemove', this.handleMouseMove)
  }
  // 移除监听
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }
  render() {
    return this.props.children(this.state)
  }
}

Mouse.propTypes = {
  children: PropType.func.isRequired,
}
export default Mouse

// 示例代码
/*
    <Mouse>
      {(data) => {
        return (
          <h1>
            当前坐标：({data.x}，{data.y})
          </h1>
        )
      }}
    </Mouse>
    <Mouse>
      {(data) => {
        return (
          <img
            src={src}
            style={{
              position: 'absolute',
              top: data.y,
              left: data.x,
            }}
            height="200"
            alt="logo"
          />
        )
      }}
    </Mouse>
*/
