import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTelInput from 'react-telephone-input'

import 'react-telephone-input/lib/withStyles'

const PUBLIC_URL = process.env.PUBLIC_URL

export default class reduxPhoneNumber extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(value) {
    const { input: { onChange } } = this.props
    onChange(value)
  }

  handleBlur() {

  }

  render() {
    const { input, hintText, meta: { error, touched }, disabled } = this.props
    const { value } = input
    // check if mobile browser
    const browsers = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    const isMobile = (browsers.test(navigator.userAgent))
    return (<div>
      <label>{hintText}</label>
      <ReactTelInput
        defaultCountry="us"
        flagsImagePath={`${PUBLIC_URL}/img/flags.png`}
        value={value}
        disableOnClickOutside = {isMobile}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        disabled={disabled}
      />
      {
        (error && touched)
        && (
          <p style={{ color: 'red' }}>{error}</p>
        )
      }
    </div>)
  }
}

reduxPhoneNumber.propTypes = {
  hintText: PropTypes.string,
  input: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  meta: PropTypes.object
}
