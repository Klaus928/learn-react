// 评论组件
import '../assets/style.css'
import React from 'react'
export class Comment extends React.Component {
  // 渲染评论列表
  renderList = () => {
    const { comments } = this.state
    if (comments.length) {
      return (
        <ul>
          {comments.map((item) => (
            <li key={item.id}>
              <h3>user: {item.name}</h3>
              <p>content: {item.content}</p>
            </li>
          ))}
        </ul>
      )
    } else {
      return <p>noData! please give us comment</p>
    }
  }
  state = {
    comments: [
      { id: 1, name: 'Jack', content: 'shafa' },
      { id: 2, name: 'Jack', content: 'shafa' },
      { id: 3, name: 'Jack', content: 'shafa' },
    ],
    userName: '',
    content: '',
  }
  handleChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  handleForm = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
    console.log(this.state)
  }
  // 发表评论
  handleSubmit = () => {
    const { userName, content, comments } = this.state
    if (!userName.trim() || !content.trim()) {
      alert('please input userName and content ')
      return
    }
    this.setState({
      comments: [{ id: Math.random(), name: userName, content }, ...comments],
      userName: '',
      content: '',
    })
  }
  render() {
    return (
      <div className="app">
        <div>
          <input
            name="userName"
            value={this.state.userName}
            onChange={this.handleForm}
            placeholder="input username"
          />
          <br />
          <textarea
            name="content"
            value={this.state.content}
            className="content"
            cols="30"
            rows="10"
            placeholder="input comment"
            onChange={this.handleForm}
          />
          <br />
          <button onClick={this.handleSubmit}>comment</button>
        </div>
        <div>{this.renderList()}</div>
      </div>
    )
  }
}
export default Comment
