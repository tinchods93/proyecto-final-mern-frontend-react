import React, { Component } from 'react';
import MyButton from '../../components/MyButton/MyButton';
import './Admin.css';
import Alert from '../../components/Alert/Alert';
import {
  getPlacesById,
  updatePlace,
  deletePlacesById,
  newPlace,
} from '../../components/helpers/services/vaccinationPlaces';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedView: 'DefaultView',
      data: undefined,
      search: true,
      showAlert: {
        alertComponent: undefined,
        show: false,
      },
    };
  }

  ReturnIcon = () => {
    return (
      <i
        className='fas fa-times-circle closeIcon'
        onClick={() => this.setState({ selectedView: 'DefaultView' })}></i>
    );
  };

  setInput = (ev) => {
    const attribute = ev.target.name;
    let { data } = this.state;
    if (!data) {
      data = {};
    }
    data[attribute] = ev.target.value;
    this.setState({ data });
  };

  getPlace = async (ev) => {
    ev.preventDefault();
    const { data } = this.state;

    if (data && data._id) {
      await getPlacesById(data._id)
        .then((place) => {
          console.log('PLACE=>', place);
          if (place.message && place.message === 'FAILED') {
            this.setState({
              showAlert: {
                show: true,
                alertComponent: (
                  <Alert severity='ERROR'>
                    ID invalido o no se encuentra un lugar con el mismo!
                  </Alert>
                ),
              },
            });
          } else {
            this.setState({
              data: place,
              search: false,
            });
          }
        })
        .catch((e) => console.log('ERROR GET PLACE EN ADMIN', e));
    }
  };

  NewPlaceView = () => {
    return (
      <div className='basic__card'>
        <div className='basic__card__header'>
          <span>Nuevo lugar de vacunación</span>
          <this.ReturnIcon />
        </div>
        <this.FormStandard
          onSubmitF={async (ev) => {
            ev.preventDefault();
            const { data } = this.state;
            if (data) await newPlace(data);
          }}
        />
      </div>
    );
  };

  FormStandard = ({ onSubmitF }) => {
    const { data } = this.state;

    return (
      <>
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
            onClick={onSubmitF}>
            Enviar
          </button>
        </form>
      </>
    );
  };

  FormShort = ({ onSubmitF }) => {
    return (
      <form>
        <div className='form__group'>
          <div className='form__label__group'>
            <label htmlFor='_id'>ID: </label>
          </div>
          <input
            onChange={this.setInput}
            type='text'
            name='_id'
            placeholder='Ingrese el ID del lugar'
          />
        </div>
        <button
          className='MyButton'
          style={{ fontWeight: 600 }}
          onClick={onSubmitF}>
          Enviar
        </button>
      </form>
    );
  };

  EditPlaceView = () => {
    const { data, search } = this.state;
    return (
      <div className='basic__card'>
        <div className='basic__card__header'>
          <span>Editar lugar de vacunación</span>
          <this.ReturnIcon />
        </div>
        {!search ? (
          <this.FormStandard
            onSubmitF={async (ev) => {
              ev.preventDefault();
              await updatePlace(data)
                .then((a) =>
                  this.setState({
                    showAlert: {
                      show: true,
                      alertComponent: (
                        <Alert severity='SUCCESS'>
                          El lugar ha sido actualizado con exito!
                        </Alert>
                      ),
                    },
                  })
                )
                .catch((e) =>
                  this.setState({
                    showAlert: {
                      show: true,
                      alertComponent: (
                        <Alert severity='ERROR'>
                          El lugar no se actualizó. Revisa que los datos sean
                          validos!
                        </Alert>
                      ),
                    },
                  })
                );
            }}
          />
        ) : (
          <this.FormShort onSubmitF={this.getPlace} />
        )}
      </div>
    );
  };

  RemovePlaceView = () => {
    return (
      <div className='basic__card'>
        <div className='basic__card__header'>
          <span>Remove Place View</span>
          <this.ReturnIcon />
        </div>
        <this.FormShort
          onSubmitF={async (ev) => {
            ev.preventDefault();
            const { data } = this.state;
            if (data && data._id) {
              await deletePlacesById(data._id);
              this.setState({
                showAlert: {
                  show: true,
                  alertComponent: (
                    <Alert severity='SUCCESS'>
                      ¡El lugar fue eliminado con exito!
                    </Alert>
                  ),
                },
              });
            } else {
              this.setState({
                showAlert: {
                  show: true,
                  alertComponent: (
                    <Alert severity='ERROR'>
                      ¡El ID es invalido o no encontramos un lugar que
                      corresponda a ese ID!
                    </Alert>
                  ),
                },
              });
            }
          }}
        />
      </div>
    );
  };

  selectFormView = (menu) =>
    this.setState({
      selectedView: menu,
      data: undefined,
      search: true,
    });

  ButtonPanel = () => {
    return (
      <div className='basic__card button__panel'>
        <div className='basic__card__header'>
          <span>Herramienta de "Lugares de Vacunación"</span>
        </div>
        <div className='button__panel__body'>
          <MyButton
            innerText='Agregar'
            onClickF={() => this.selectFormView('NewPlaceView')}
          />
          <MyButton
            innerText='Editar'
            onClickF={() => this.selectFormView('EditPlaceView')}
          />
          <MyButton
            innerText='Quitar'
            onClickF={() => this.selectFormView('RemovePlaceView')}
          />
        </div>
      </div>
    );
  };

  getView = () => {
    const views = {
      NewPlaceView: <this.NewPlaceView />,
      EditPlaceView: <this.EditPlaceView />,
      RemovePlaceView: <this.RemovePlaceView />,
      DefaultView: <this.ButtonPanel />,
    };
    const { selectedView } = this.state;
    return views[selectedView];
  };

  render() {
    const { showAlert } = this.state;
    return (
      <div className='centered__container'>
        {showAlert.show ? showAlert.alertComponent : ''}
        {this.getView()}
      </div>
    );
  }
}
