import MapView from './MapView';
import moment from 'moment';

const DataAppointment = ({ appointmentData }) => {
  const InfoBody = () => {
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
  console.log('APPOINTMENT DATA=>', appointmentData);
  return appointmentData ? (
    <div className='body__container'>
      <div className='map__container'>
        <div className='map__header'>
          <h3>Lugar de vacunación</h3>
        </div>
        <MapView place={appointmentData.place_id} />
      </div>
      <div className='basic__card appointmentInfo'>
        <InfoBody />
      </div>
    </div>
  ) : (
    <div className='body__container'>
      <h3>Ese DNI no existe en nuestra base de datos, revise si es correcto</h3>
    </div>
  );
};

export default DataAppointment;
