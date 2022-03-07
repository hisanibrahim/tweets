import React from 'react';
import SearchBox from '../containers/SearchBox';
import TweetList from '../containers/TweetList'
import Loading from '../containers/Loading'


let App = () => (
  <div>
    <SearchBox />
    <Loading />
    <TweetList />
  </div>
);


export default App;
