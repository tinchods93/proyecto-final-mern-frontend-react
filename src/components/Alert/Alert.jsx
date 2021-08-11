import React, { Component } from 'react';
import './Alert.css';
export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.children || this.props.message,
      severity: this.props.severity.toUpperCase(),
      header: this.props.header || `${this.props.severity.toUpperCase()}!`,
      alertClass: {
        ERROR: 'error',
        SUCCESS: 'success',
      },
      active: true,
    };
  }

  render() {
    const { severity, header, message, alertClass, active } = this.state;

    return active ? (
      <div
        className={`miAlert miAlert--${alertClass[severity]}`}
        onClick={() => this.setState({ active: false })}>
        <div className='alert__header'>
          <span>{header}</span>
          <i className='far fa-times-circle' />
        </div>
        <div className='alert__body'>
          <span>{message}</span>
        </div>
      </div>
    ) : (
      ''
    );
  }
}
