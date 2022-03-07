import React from 'react';
import SearchBox from '../containers/SearchBox';
import Tweet from '../containers/Tweet'
import Loading from '../containers/Loading'


let App = () => (
  <div>
    <SearchBox />
    <Loading />
    <Tweet />
  </div>
);


export default App;
