import { getPlaces } from '../../services/vaccinationPlaces';

//Action types
export const REFRESH_PLACES = 'REFRESH_PLACES';
export const SELECT_PLACE = 'SELECT_PLACE';

//Actions Sync
export const selectPlaceAction = (payload) => ({
  type: SELECT_PLACE,
  payload,
});

//Actions Async
export const refreshPlacesAction = () => {
  return async (dispatch) => {
    const places = await getPlaces();
    dispatch({
      type: REFRESH_PLACES,
      payload: places,
    });
  };
};
