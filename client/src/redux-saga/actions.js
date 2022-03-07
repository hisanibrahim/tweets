export const LOAD_TWEETS_LOADING = "REDUX_SAGA_LOAD_TWEETS_LOADING";
export const LOAD_TWEETS_SUCCESS = "REDUX_SAGA_LOAD_TWEETS_SUCCESS";
export const LOAD_TWEETS_ERROR = "REDUX_SAGA_LOAD_TWEETS_ERROR";

export const loadTweets = () => (dispatch) => {
  dispatch({ type: LOAD_TWEETS_LOADING });
};
