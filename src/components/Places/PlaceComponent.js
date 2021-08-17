export default function PlaceComponent({ place, onClickFunction }) {
  return (
    <div
      className='miCard'
      onClick={() => {
        onClickFunction(place);
      }}>
      <img src={place.url} alt='Imagen de portada' />
      <span>{place.name}</span>
    </div>
  );
}
