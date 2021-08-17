import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  placesSelector,
  selectedSelector,
} from '../../app/redux/selectors/vPlacesSelector';
import {
  deletePlaceAction,
  refreshPlacesAction,
  postPlaceAction,
} from '../../app/redux/actions/vPlacesAction';

import LoadingIcon from '../../components/LoadingIcon';
import { ModalComponent } from '../../components/Places/PlaceModal';
import { PlaceTable } from '../../components/Places/PlaceTable';

const mapStateToProps = (state) => ({
  places: placesSelector(state),
  selected: selectedSelector(state),
});
const mapActionsToProps = (dispatch) => ({
  refreshPlace: () => dispatch(refreshPlacesAction()),
  postPlace: () => dispatch(postPlaceAction()),
  deletePlace: (id) => dispatch(deletePlaceAction(id)),
});

export class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  componentDidMount() {
    this.props.refreshPlace();
  }

  componentDidUpdate() {
    this.props.refreshPlace();
  }

  flipModal = () => {
    const { modalIsOpen } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
  };

  render() {
    const { places } = this.props;
    const { modalIsOpen } = this.state;

    return places.length ? (
      <>
        <span id='titulo_tabla'>Tabla de Administración</span>
        <ModalComponent
          openModal={modalIsOpen}
          flipModal={this.flipModal}
          title={'Nuevo Lugar'}
          formType={'NEW'}
          onSubmitF={() => {
            this.flipModal();
          }}
        />
        <div className='admin__header'>
          <i
            className='fas fa-plus-square'
            onClick={() => this.flipModal()}></i>
        </div>
        <PlaceTable
          places={places}
          reduxActions={{ delete: this.props.deletePlace }}
        />
      </>
    ) : (
      <>
        <LoadingIcon />
      </>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AdminView);
