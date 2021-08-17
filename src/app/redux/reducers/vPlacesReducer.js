const initialState = {
  selected: null,
  places: [],
};

export const vPlacesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const myReducer = {
    REFRESH_PLACES: { ...state, places: payload },
    SELECT_PLACE: { ...state, selected: payload },
    DELETE_PLACE: state,
  };

  return myReducer[type] || state;
};
