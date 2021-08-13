import React, { Component } from 'react';
import '../../assets/Home.css';
import { getPlaces } from '../../components/common/services/vaccinationPlaces';
import PlaceDetails from '../../components/PlaceDetails';
import LoadingIcon from '../../components/LoadingIcon';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placesData: undefined,
      placeSelected: undefined,
    };
  }
  componentDidMount = () => {
    getPlaces().then((resp) => {
      if (resp) this.setState({ placesData: resp });
    });
  };

  selectFormView = () =>
    this.setState({
      placeSelected: undefined,
    });

  PlaceComponent = ({ place }) => {
    return (
      <div
        className='miCard'
        onClick={() => this.setState({ placeSelected: place })}>
        <img src={place.url} alt='Imagen de portada' />
        <span>{place.name}</span>
      </div>
    );
  };

  render() {
    const { placesData, placeSelected } = this.state;
    if (placeSelected) {
      return <PlaceDetails placeSelected={placeSelected} />;
    } else {
      return (
        <>
          <div className='home__header'>
            <div className='home__header__background'>
              <img
                src='https://pbs.twimg.com/media/Eu3SL65XUAsBsns.jpg'
                alt=''
              />
            </div>
            <div className='home__header__text'>
              <div className='icon__container'>
                <i className='fas fa-virus'></i>
                <i className='fas fa-syringe'></i>
              </div>
              <span>Vacunaciones COVID - 19</span>
              <p>
                La vacunación se llevará a cabo en etapas de acuerdo a los
                grupos establecidos y se realizará en forma gratuita, equitativa
                y voluntaria.
              </p>
            </div>
          </div>
          <div className='home__body'>
            <div className='home__body__header'>
              <span>¿Donde Vacunarme?</span>
            </div>
            {placesData && placesData.length ? (
              <section className='grid__container'>
                {placesData.map((place, index) => (
                  <this.PlaceComponent place={place} key={index} />
                ))}
              </section>
            ) : (
              <LoadingIcon />
            )}
          </div>
        </>
      );
    }
  }
}
