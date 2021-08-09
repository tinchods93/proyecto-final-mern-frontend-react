import React, { Component } from 'react';

import { getPlaces } from '../components/helpers/services/vaccinationPlaces';

export default class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placesData: undefined,
    };
  }
  componentDidMount = () => {
    getPlaces().then((resp) => {
      if (resp) this.setState({ placesData: resp });
    });
  };

  PlaceComponent = ({ name }) => {
    return (
      <div className='miCard'>
        <span>{name}</span>
      </div>
    );
  };

  render() {
    const { placesData } = this.state;
    return (
      <div className='grid__container'>
        {placesData ? (
          placesData.map((place, index) => (
            <this.PlaceComponent name={place.name} key={index} />
          ))
        ) : (
          <></>
        )}
      </div>
    );
  }
}
