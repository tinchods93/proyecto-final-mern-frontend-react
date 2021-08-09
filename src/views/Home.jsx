import React, { Component } from 'react';
import todayCovidData from '../components/helpers/services/todayCovidData';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayData: undefined,
    };
  }

  componentDidMount() {
    todayCovidData().then((resp) => {
      if (resp) this.setState({ todayData: resp });
    });
  }
  render() {
    return (
      <>
        <h4>HOME</h4>
      </>
    );
  }
}
