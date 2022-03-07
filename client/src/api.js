const API_BASE_ADDRESS = 'http://localhost:4000';

export default class Api {
   static getTweets() {
       const uri = API_BASE_ADDRESS + "/api/tweets";
       
       return fetch(uri, {
           method: 'GET'
       });
   }
}