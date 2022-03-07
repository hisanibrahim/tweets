import {
  LOAD_TWEETS_ERROR,
  LOAD_TWEETS_LOADING,
  LOAD_TWEETS_SUCCESS,
} from "./actions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export default function reduxSagaReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TWEETS_LOADING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case LOAD_TWEETS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case LOAD_TWEETS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
