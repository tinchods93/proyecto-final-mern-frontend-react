import {
  getPlaces,
  deletePlacesById,
  newPlace,
  updatePlace,
} from '../../services/vaccinationPlaces';

//Action types
export const REFRESH_PLACES = 'REFRESH_PLACES';
export const SELECT_PLACE = 'SELECT_PLACE';
export const POST_PLACE = 'POST_PLACE';
export const POST_PLACE_OK = 'POST_PLACE_OK';
export const POST_PLACE_ERROR = 'POST_PLACE_ERROR';
export const PATCH_PLACE = 'PATCH_PLACE';
export const PATCH_PLACE_OK = 'PATCH_PLACE_OK';
export const PATCH_PLACE_ERROR = 'PATCH_PLACE_ERROR';
export const DELETE_PLACE = 'DELETE_PLACE';
export const DELETE_PLACE_OK = 'DELETE_PLACE_OK';
export const DELETE_PLACE_ERROR = 'DELETE_PLACE_ERROR';

export const postPlace = () => ({ type: DELETE_PLACE });
export const postPlaceOk = (postedPlace) => ({
  type: POST_PLACE_OK,
  payload: postedPlace,
});
export const postPlaceError = (err) => ({
  type: POST_PLACE_ERROR,
  payload: err,
});

export const patchPlace = () => ({ type: PATCH_PLACE });
export const patchPlaceOk = (patchedPlace) => ({
  type: PATCH_PLACE_OK,
  payload: patchedPlace,
});
export const patchPlaceError = (err) => ({
  type: PATCH_PLACE_ERROR,
  payload: err,
});

export const deletePlace = () => ({ type: DELETE_PLACE });
export const deletePlaceOk = (deletedPlace) => ({
  type: DELETE_PLACE_OK,
  payload: deletedPlace,
});
export const deletePlaceError = (err) => ({
  type: DELETE_PLACE_ERROR,
  payload: err,
});

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

export const deletePlaceAction = (id) => {
  return async (dispatch) => {
    dispatch(deletePlace());
    console.log('DISPATCH DEELETE=>', id);
    try {
      const deletedPlace = await deletePlacesById(id);
      dispatch(deletePlaceOk(deletedPlace));
      dispatch(refreshPlacesAction());
    } catch (e) {
      console.log(e);
      const { message } = e;
      dispatch(deletePlaceError(message));
    }
  };
};

export const postPlaceAction = (data) => {
  return async (dispatch) => {
    dispatch(postPlace());
    try {
      const createdPlace = await newPlace(data);
      dispatch(postPlaceOk(createdPlace));
      dispatch(refreshPlacesAction());
    } catch (e) {
      console.log(e);
      const { message } = e;
      dispatch(postPlaceError(message));
    }
  };
};

export const patchPlaceAction = (data) => {
  return async (dispatch) => {
    dispatch(patchPlace());
    try {
      const updatedPlace = await updatePlace(data);
      console.log('EN UPDATE PLACE');
      dispatch(patchPlaceOk(updatedPlace));
      dispatch(refreshPlacesAction());
    } catch (e) {
      console.log(e);
      const { message } = e;
      dispatch(patchPlaceError(message));
    }
  };
};
