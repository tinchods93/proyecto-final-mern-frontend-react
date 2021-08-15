import PlaceComponent from './PlaceComponent';

export default function PlaceList({ placeList, onClickFunction }) {
  return (
    <section className='grid__container'>
      {placeList.map((place, index) => (
        <PlaceComponent
          place={place}
          onClickFunction={onClickFunction}
          key={index}
        />
      ))}
    </section>
  );
}
