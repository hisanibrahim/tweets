import { put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  LOAD_TWEETS_ERROR,
  LOAD_TWEETS_LOADING,
  LOAD_TWEETS_SUCCESS,
} from "./actions";
import Api from "../api";

async function fetchAsync(func) {
  const response = await func();

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Unexpected error!!!");
}

function* fetchTweets() {
  try {
    const tweets = yield fetchAsync(Api.getTweets);

    yield put({ type: LOAD_TWEETS_SUCCESS, data: tweets });
  } catch (e) {
    yield put({ type: LOAD_TWEETS_ERROR, error: e.message });
  }
}

export function* tweetsSaga() {
  // Allows concurrent fetches of tweets
  yield takeEvery(LOAD_TWEETS_LOADING, fetchTweets);

  // Does not allow concurrent fetches of tweets
  // yield takeLatest(LOAD_TWEETS_LOADING, fetchTweets);
}

export default tweetsSaga;
