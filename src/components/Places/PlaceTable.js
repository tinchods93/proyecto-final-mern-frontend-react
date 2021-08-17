import { PlaceTableItem } from './PlaceTableItem';
import '../../assets/AdminTable.css';
export const PlaceTable = ({ places, reduxActions }) => {
  return (
    <div className='tableContainer'>
      <table id='AdminTable'>
        <thead>
          <tr>
            <th rowSpan='2'>id</th>
            <th rowSpan='2'>Nombre</th>
            <th rowSpan='2'>Direccion</th>
            <th colSpan='2'>Position</th>
            <th rowSpan='2'>Imagen Url</th>
            <th rowSpan='2'>Acciones</th>
          </tr>
          <tr>
            <th>Latitud</th>
            <th>Longitud</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place, index) => (
            <PlaceTableItem
              item={place}
              deleteFunction={reduxActions.delete}
              key={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
