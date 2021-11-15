import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import src from './assets/pinia.jpg'
// import App, { Hello, StateComp, ControlComp } from './App'
// import Comment from './example/comments'
// import { Father } from './example/concat'
// import ValidProps from './example/props'
import App from './example/lifeCircle'
import Mouse from './example/render-props'
import { withMouse } from './example/high-level'
import reportWebVitals from './reportWebVitals'

const PositionComp = (props) => {
  return (
    <h1>
      当前坐标：({props.x}，{props.y})
    </h1>
  )
}
const WithMousePosition = withMouse(PositionComp, 'WithMousePosition')
ReactDOM.render(
  <React.StrictMode>
    <WithMousePosition />
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
    {/* <App name="hello world" /> */}
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
