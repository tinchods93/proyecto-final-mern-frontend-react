import React, { Component } from 'react';
import './Alert.css';
export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.children || this.props.message,
      header: this.props.header || '',
      severity: this.props.severity.toUpperCase(),
      alertClass: {
        ERROR: 'error',
        SUCCESS: 'success',
      },
      active: true,
    };
  }

  render() {
    const { severity, header, message, alertClass } = this.state;

    return (
      <div
        className={`miAlert miAlert--${alertClass[severity]}`}
        onClick={this.props.onClick}>
        <div className='alert__header'>
          <span>{header}</span>
          <i class='far fa-times-circle' />
        </div>
        <div className='alert__body'>
          <span>{message}</span>
        </div>
      </div>
    );
  }
}
