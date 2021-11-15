import React from 'react'
import PropTypes from 'prop-types'

class ValidProps extends React.Component {
  render() {
    return <h1>{this.props.msg}</h1>
  }
}
// https://www.npmjs.com/package/prop-types
ValidProps.propTypes = {
  msg: PropTypes.string,
  title: PropTypes.string.isRequired,
  optionalObjectWithShape: PropTypes.shape({
    optionalProperty: PropTypes.string,
    requiredProperty: PropTypes.number.isRequired,
  }),
}
// 默认值
ValidProps.defaultProps = {
  msg: 'hello React',
}
export default ValidProps
