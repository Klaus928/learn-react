import React from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
class App extends React.Component {
  render() {
    return (
      <div>
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem',
          }}
        >
          <Link to="/home">home</Link> | <Link to="/login">login</Link>
        </nav>
        <Outlet />
      </div>
    )
  }
}
export default App

export function Home() {
  let navigate = useNavigate()
  const handleBacktoLogin = () => {
    navigate('/login')
  }
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleBacktoLogin}>返回登录</button>
    </div>
  )
}
export function Login() {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/home')
  }
  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>登录</button>
    </div>
  )
}

/*
路由示例：
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />}></Route>
        </Route>
      </Routes>
    </Router>
 */

// export class Home extends React.Component {
//   handleLogin = () => {
//     this.props.history.push('/login')
//   }
//   render() {
//     return (
//       <div>
//         <h1>Home</h1>
//         <button onClick={this.handleLogin}>login</button>
//       </div>
//     )
//   }
// }

// export class Login extends React.Component {
//   render() {
//     return <h1>Login</h1>
//   }
// }
