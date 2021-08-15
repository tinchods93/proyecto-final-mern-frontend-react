import React, { Component } from 'react';
import '../../assets/Home.css';
// import { getPlaces } from '../../app/services/vaccinationPlaces';
import PlaceDetails from '../../components/PlaceDetails';
import LoadingIcon from '../../components/LoadingIcon';
import { connect } from 'react-redux';
import {
  placesSelector,
  selectedSelector,
} from '../../app/redux/selectors/vPlacesSelector';
import { refreshPlacesAction } from '../../app/redux/actions/vPlacesAction';

const mapStateToProps = (state) => ({
  places: placesSelector(state),
  selected: selectedSelector(state),
});
const mapActionsToProps = (dispatch) => ({
  refreshPlace: () => dispatch(refreshPlacesAction()),
});

export class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placesData: undefined,
      placeSelected: undefined,
    };
  }
  componentDidMount = () => {
    if (!this.props.places.length) {
      this.props.refreshPlace();
    }
  };

  componentDidUpdate() {
    if (this.props.places.length && !this.state.placesData) {
      this.setState({ placesData: this.props.places });
    }
  }

  render() {
    return (
      <>
        <h4>Admin View</h4>
      </>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AdminView);
