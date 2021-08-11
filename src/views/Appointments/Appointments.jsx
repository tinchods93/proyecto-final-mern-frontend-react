import React, { Component } from 'react';
import './Appointments.css';
import {
  getAppointmentByDni,
  newAppointment,
} from '../../components/helpers/services/appointments';
import moment from 'moment';
import MapView from '../../components/Map/MapView';
import MyButton from '../../components/MyButton/MyButton';

export default class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentData: undefined,
      selectedView: 'DefaultView',
      data: undefined,
      showData: false,
      showToast: false,
    };
  }

  selectFormView = (menu) =>
    this.setState({
      selectedView: menu,
      data: undefined,
      appointmentData: undefined,
      showData: false,
      showToast: false,
    });

  setInput = (ev) => {
    const attribute = ev.target.name;
    let { data } = this.state;
    if (!data) {
      data = {};
    }
    data[attribute] = ev.target.value;
    this.setState({ data });
  };

  getAppointmentData = async (ev) => {
    ev.preventDefault();

    try {
      const { data } = this.state;

      await getAppointmentByDni(data.dni).then((appo) =>
        this.setState({
          appointmentData: appo,
          showData: true,
          showToast: true,
        })
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  postAppointmentData = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = this.state;

      if (data) {
        await newAppointment(data).then((appo) =>
          this.setState({
            appointmentData: appo,
            showData: true,
            showToast: true,
          })
        );
      }
    } catch (error) {
      console.log('ERROR=>', error);
    }
  };

  DataAppointment = () => {
    const { appointmentData } = this.state;

    if (appointmentData) {
      return (
        <div className='body__container'>
          <div className='map__container'>
            <div className='map__header'>
              <h3>Lugar de vacunación</h3>
            </div>
            <MapView place={appointmentData.place_id} />
          </div>
          <div className='basic__card appointmentInfo'>
            <this.InfoBody />
          </div>
        </div>
      );
    } else {
      return (
        <div className='body__container'>
          <h3>
            Ese DNI no existe en nuestra base de datos, revise si es correcto
          </h3>
        </div>
      );
    }
  };

  InfoBody = () => {
    const { appointmentData } = this.state;

    try {
      const { date, place_id, state_process, user_id } = appointmentData;
      return (
        <>
          <div className='basic__card__header InfoBody_header'>
            <span>Datos del solicitante</span>
          </div>
          <div className='InfoBody__group'>
            <label htmlFor='user_name'>Nombre: </label>
            <span name='user_name'>{`${user_id.name} ${user_id.last_name}`}</span>
          </div>
          <div className='InfoBody__group'>
            <label htmlFor='dose'>Dosis: </label>
            <span name='dose'>
              {user_id.dose === 0 ? 'Primera dosis' : 'Segunda dosis'}
            </span>
          </div>
          <div className='InfoBody__group'>
            <label htmlFor='state_process'>Estado de la vacuna: </label>
            <span name='state_process'>
              {state_process === 'IN_PROGRESS'
                ? 'Todavía no se vacunó'
                : 'Vacunado'}
            </span>
          </div>
          <div className='InfoBody__group InfoBody_header'>
            <span>Información sobre el lugar y fecha de vacunación</span>
          </div>
          <div className='InfoBody__group'>
            <label htmlFor='date'>Fecha del turno de vacunación: </label>
            <span name='date'>
              {moment(date.split('T')[0]).format('DD-MM-YYYY')}
            </span>
          </div>
          <div className='InfoBody__group'>
            <label htmlFor='place_name'>Lugar: </label>
            <span name='place_name'>{place_id.name}</span>
          </div>
          <div className='InfoBody__group'>
            <label htmlFor='url'>Foto de la entrada del lugar: </label>
            <span
              name='url'
              onClick={() => this.handleLinkClick(place_id.url)}
              className='customLink'>
              Hacé click acá
            </span>
          </div>
          <div className='InfoBody__group'>
            <label htmlFor='place_address'>Dirección: </label>
            <span name='place_address'>{place_id.address}</span>
          </div>
        </>
      );
    } catch (error) {
      console.log('ERROR', error);
      return <h3>"No se cargo"</h3>;
    }
  };

  handleLinkClick = (url) => {
    window.open(url);
  };

  DefaultView = () => {
    return (
      <div className='centered__container'>
        <div className='basic__card'>
          <div className='basic__card__header --center'>
            <span>¿Qué desea hacer?</span>
          </div>
          <div className='appointmentMenu__buttonContainer'>
            <MyButton
              innerText={'Sacar Turno'}
              onClickF={() => this.selectFormView('NewAppointmentView')}
            />
            <MyButton
              innerText={'Buscar Turno'}
              onClickF={() => this.selectFormView('SearchAppointmentView')}
            />
          </div>
        </div>
      </div>
    );
  };

  SearchAppointmentView = () => {
    return (
      <div className='appointmentsData__container'>
        <div className='form__container'>
          <form className='basic__card'>
            <div className='form__group'>
              <div className='form__label__group'>
                <label htmlFor='dni'>DNI: </label>
              </div>
              <input
                onChange={this.setInput}
                type='text'
                name='dni'
                placeholder='Ingrese su DNI'
              />
            </div>
            <button
              className='MyButton'
              style={{ fontWeight: 600 }}
              onClick={this.getAppointmentData}>
              Enviar
            </button>
          </form>
        </div>
        <>{this.state.showData ? <this.DataAppointment /> : <></>}</>
        <i
          className='fas fa-times-circle closeIcon'
          onClick={() => this.selectFormView('DefaultView')}></i>
      </div>
    );
  };

  NewAppointmentView = () => {
    return (
      <div className='appointmentsData__container'>
        <div className='form__container'>
          <form className='basic__card'>
            <div className='form__group'>
              <div className='form__label__group'>
                <label htmlFor='name'>Nombre: </label>
              </div>
              <input
                onChange={this.setInput}
                type='text'
                name='name'
                placeholder='Ingrese su nombre'
              />
            </div>
            <div className='form__group'>
              <div className='form__label__group'>
                <label htmlFor='last_name'>Apellido: </label>
              </div>
              <input
                onChange={this.setInput}
                type='text'
                name='last_name'
                placeholder='Ingrese su apellido'
              />
            </div>
            <div className='form__group'>
              <div className='form__label__group'>
                <label htmlFor='born_date'>Fecha de Nacimiento: </label>
              </div>
              <input onChange={this.setInput} type='date' name='born_date' />
            </div>
            <div className='form__group'>
              <div className='form__label__group'>
                <label htmlFor='dni'>DNI: </label>
              </div>
              <input
                onChange={this.setInput}
                type='text'
                name='dni'
                placeholder='Ingrese su dni'
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
                placeholder='Ingrese su dirección'
              />
            </div>
            <button
              className='MyButton'
              style={{ fontWeight: 600 }}
              onClick={this.postAppointmentData}>
              Enviar
            </button>
          </form>
        </div>
        <>
          <>{this.state.showData ? <this.DataAppointment /> : <></>}</>
        </>
        <i
          className='fas fa-times-circle closeIcon'
          onClick={() => this.selectFormView('DefaultView')}></i>
      </div>
    );
  };

  getView = () => {
    const views = {
      NewAppointmentView: <this.NewAppointmentView />,
      SearchAppointmentView: <this.SearchAppointmentView />,
      DefaultView: <this.DefaultView />,
    };
    const { selectedView } = this.state;
    return views[selectedView];
  };

  render() {
    return this.getView();
  }
}
