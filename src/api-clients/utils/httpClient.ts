import axios from 'axios';
import { SHOWS_DOMAIN } from './constants';

export default axios.create({
  baseURL: SHOWS_DOMAIN,
});
