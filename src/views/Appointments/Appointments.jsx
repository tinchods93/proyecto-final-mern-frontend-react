import React, { Component } from 'react';
import './Appointments.css';
import {
  getAppointmentByDni,
  newAppointment,
} from '../../components/helpers/services/appointments';
import moment from 'moment';
import GoogleMaps from 'simple-react-google-maps';

export default class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentData: undefined,
      selectedView: 'DefaultView',
      data: undefined,
      showData: false,
    };
  }

  selectFormView = (menu) =>
    this.setState({
      selectedView: menu,
      data: undefined,
      appointmentData: undefined,
    });

  MyButton = ({ innerText, menu }) => {
    return (
      <div onClick={() => this.selectFormView(menu)} className='MyButton'>
        {innerText}
      </div>
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

  getAppointmentData = async (ev) => {
    ev.preventDefault();

    try {
      const { data } = this.state;

      await getAppointmentByDni(data.dni).then((appo) =>
        this.setState({ appointmentData: appo, showData: true })
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
          this.setState({ appointmentData: appo, showData: true })
        );
      }
    } catch (error) {
      console.log('ERROR=>', error);
    }
  };

  DataAppointment = () => {
    const { appointmentData } = this.state;
    return (
      <div className='body__container'>
        <div className='map'>
          <div className='map__header'>
            <h3>MAP HEADER</h3>
          </div>
        </div>
        <div className='appointmentInfo'>
          <div className='appointmentInfo__header'>
            <h3>INFO HEADER</h3>
          </div>
          <div className='appointmentInfo__body'>
            <this.InfoBody />
          </div>
        </div>
      </div>
    );
  };

  InfoBody = () => {
    const { appointmentData } = this.state;

    try {
      const { date, place_id, state_process, user_id } = appointmentData;
      return (
        <div className='InfoBody'>
          <div className='InfoBody__group InfoBody_header'>
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
            <label htmlFor='date'>Fecha: </label>
            <span name='date'>
              {moment(date.split('T')[0]).format('DD-MM-YYYY')}
            </span>
          </div>
          <div className='InfoBody__group'>
            <label htmlFor='place_name'>Lugar: </label>
            <span name='place_name'>{place_id.name}</span>
          </div>
          <div className='InfoBody__group'>
            <label htmlFor='place_address'>Dirección: </label>
            <span name='place_address'>{place_id.address}</span>
          </div>
        </div>
      );
    } catch (error) {
      console.log('ERROR', error);
      return <h3>"No se cargo"</h3>;
    }
  };

  DefaultView = () => {
    return (
      <div className='appointmentMenu'>
        <div className='appointmentMenu__header'>
          <h2>¿Qué desea hacer?</h2>
        </div>
        <div className='appointmentMenu__buttonContainer'>
          <this.MyButton
            innerText={'Sacar Turno'}
            menu={'NewAppointmentView'}
          />
          <this.MyButton
            innerText={'Buscar Turno'}
            menu={'SearchAppointmentView'}
          />
        </div>
      </div>
    );
  };

  SearchAppointmentView = () => {
    return (
      <div className='appointmentsData__container'>
        <div className='form__container'>
          <form className='formCard'>
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
          <form className='formCard'>
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
