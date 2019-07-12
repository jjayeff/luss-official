import axios from 'axios';

export default axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/http://ec2-54-206-120-221.ap-southeast-2.compute.amazonaws.com:3000'
});
