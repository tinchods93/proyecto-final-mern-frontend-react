import React, { Component } from 'react';
import '../../assets/Home.css';
import PlaceDetails from '../../components/PlaceDetails';
import PlaceList from '../../components/PlaceList';
import LoadingIcon from '../../components/LoadingIcon';
import { connect } from 'react-redux';

import {
  placesSelector,
  selectedSelector,
} from '../../app/redux/selectors/vPlacesSelector';
import {
  refreshPlacesAction,
  selectPlaceAction,
} from '../../app/redux/actions/vPlacesAction';

const mapStateToProps = (state) => ({
  places: placesSelector(state),
  selected: selectedSelector(state),
});
const mapActionsToProps = (dispatch) => ({
  refreshPlace: () => dispatch(refreshPlacesAction()),
  selectPlace: (placeSelected) => dispatch(selectPlaceAction(placeSelected)),
});

export class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    try {
      if (!this.props.places.length) {
        this.props.refreshPlace();
      }
    } catch (error) {
      console.log('ERROR trying to use props function in HOME', error);
    }
  };

  selectFormView = () =>
    this.setState({
      placeSelected: null,
    });

  render() {
    const { places, selected, selectPlace } = this.props;

    return selected ? (
      <PlaceDetails placeSelected={selected} />
    ) : (
      <>
        <div className='home__header'>
          <div className='home__header__background'>
            <img src='https://pbs.twimg.com/media/Eu3SL65XUAsBsns.jpg' alt='' />
          </div>
          <div className='home__header__text'>
            <div className='icon__container'>
              <i className='fas fa-virus'></i>
              <i className='fas fa-syringe'></i>
            </div>
            <span>Vacunaciones COVID - 19</span>
            <p>
              La vacunación se llevará a cabo en etapas de acuerdo a los grupos
              establecidos y se realizará en forma gratuita, equitativa y
              voluntaria.
            </p>
          </div>
        </div>
        <div className='home__body'>
          <div className='home__body__header'>
            <span>¿Donde Vacunarme?</span>
          </div>
          {places && places.length ? (
            <PlaceList placeList={places} onClickFunction={selectPlace} />
          ) : (
            <LoadingIcon />
          )}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Home);
