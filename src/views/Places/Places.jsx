import React, { Component } from 'react';
import './Places.css';
import { getPlaces } from '../../components/helpers/services/vaccinationPlaces';
import MapView from '../../components/Map/MapView';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
export default class Places extends Component {
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

  PlaceDetails = () => {
    const { placeSelected } = this.state;
    return (
      <div className='place'>
        <div className='place__header'>
          <i
            className='fas fa-times-circle closeIcon'
            onClick={() => this.selectFormView('DefaultView')}></i>
        </div>
        <div className='place__body'>
          <div className='place__details'>
            <div className='details__group'>
              <label htmlFor='id'>ID: </label>
              <span>{placeSelected._id}</span>
            </div>
            <div className='details__group'>
              <label htmlFor='name'>Nombre: </label>
              <span>{placeSelected.name}</span>
            </div>
            <div className='details__group'>
              <label htmlFor='address'>Dirección: </label>
              <span>{placeSelected.address}</span>
            </div>
            <div className='details__group'>
              <img
                src={placeSelected.url}
                alt='Imagen del lugar'
                onClick={() => {
                  window.open(placeSelected.url);
                }}
              />
            </div>
          </div>
          <div className='place__map'>
            <MapView place={placeSelected} />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { placesData, placeSelected } = this.state;
    if (placeSelected) {
      return <this.PlaceDetails />;
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
