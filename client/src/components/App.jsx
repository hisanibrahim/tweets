import React from 'react';
import Button from '../containers/Button';
import Tweet from '../containers/Tweet'
import Loading from '../containers/Loading'


let App = () => (
  <div>
    <Button />
    <Loading />
    <Tweet />
  </div>
);


export default App;
