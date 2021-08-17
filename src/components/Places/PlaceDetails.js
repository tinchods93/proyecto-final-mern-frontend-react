import MapView from '../MapView';

const PlaceDetails = ({ placeSelected }) => {
  return (
    <div className='place'>
      <div className='place__header'>
        <a href='/'>
          <i className='fas fa-times-circle closeIcon' />
        </a>
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

export default PlaceDetails;
