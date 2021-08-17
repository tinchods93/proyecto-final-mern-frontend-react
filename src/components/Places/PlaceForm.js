import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  placesSelector,
  selectedSelector,
} from '../../app/redux/selectors/vPlacesSelector';
import {
  postPlaceAction,
  patchPlaceAction,
  refreshPlacesAction,
} from '../../app/redux/actions/vPlacesAction';

const mapStateToProps = (state) => ({
  places: placesSelector(state),
  selected: selectedSelector(state),
});

const mapActionsToProps = (dispatch) => ({
  refreshPlace: () => dispatch(refreshPlacesAction()),
  postPlace: (place) => dispatch(postPlaceAction(place)),
  patchPlace: (place) => dispatch(patchPlaceAction(place)),
});

export class PlaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      formType: this.props.formType,
    };
  }

  setInput = (ev) => {
    const attribute = ev.target.name;
    let { data } = this.state;
    if (!data) {
      data = {};
    }
    data[attribute] = ev.target.value;
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    const { onSubmitF } = this.props;
    return (
      <form>
        <div className='form__group'>
          <div className='form__label__group'>
            <label htmlFor='name'>Nombre: </label>
          </div>
          <input
            onChange={this.setInput}
            type='text'
            name='name'
            value={data ? data.name : ''}
            placeholder='Nombre del lugar'
          />
        </div>
        <div className='form__group'>
          <div className='form__label__group'>
            <label htmlFor='address'>Dirección: </label>
          </div>
          <input
            onChange={this.setInput}
            type='text'
            name='address'
            value={data ? data.address : ''}
            placeholder='Dirección del lugar'
          />
        </div>
        <div className='form__group form__group__especial'>
          <div className='form__label__group'>
            <label htmlFor='name'>Posicion en el mapa: </label>
          </div>
          <div className='especial__body'>
            <div className='especial__group'>
              <div>
                <label htmlFor='latitude'>Lat:</label>
              </div>
              <input
                onChange={this.setInput}
                type='number'
                name='latitude'
                value={data ? data.latitude : ''}
                placeholder='Latitud'
              />
            </div>
            <div className='especial__group'>
              <div>
                <label htmlFor='longitude'>Lon:</label>
              </div>
              <input
                onChange={this.setInput}
                type='number'
                name='longitude'
                value={data ? data.longitude : ''}
                placeholder='Longitud'
              />
            </div>
          </div>
        </div>
        <div className='form__group'>
          <div className='form__label__group'>
            <label htmlFor='url'>Imagen de la entrada: </label>
          </div>
          <input
            onChange={this.setInput}
            type='text'
            name='url'
            value={data ? data.url : ''}
            placeholder='Ingrese el enlace a la imagen'
          />
        </div>
        <button
          className='MyButton'
          style={{ fontWeight: 600 }}
          onClick={(ev) => {
            ev.preventDefault();
            this.props.formType === 'NEW'
              ? this.props.postPlace(data)
              : this.props.patchPlace(data);
            this.props.refreshPlace();
            onSubmitF();
          }}>
          Enviar
        </button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(PlaceForm);
