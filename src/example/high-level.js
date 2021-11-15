import React from 'react'
import PropType from 'prop-types'
// 组件复用
// render props
// 高阶组件
// 将需要复用的状态放到回调函数中作为参数
// 函数返回值作为UI内容/使用children更加直观（推荐）
export function withMouse(WrappedComp, displayName) {
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
      return <WrappedComp {...this.state} />
    }
  }
  Mouse.displayName = displayName
  return Mouse
  // Mouse.propTypes = {
  //   children: PropType.func.isRequired,
  // }
}

// export default withMouse

// 示例代码
/*
 const PositionComp = (props) => {
  return (
    <h1>
      当前坐标：({props.x}，{props.y})
    </h1>
  )
}
const WithMousePosition = withMouse(PositionComp, 'WithMousePosition')
*/
