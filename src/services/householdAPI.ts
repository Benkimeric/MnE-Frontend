import axios from 'axios';
import resolveBaseUrl from '.';

const baseUrl = resolveBaseUrl();

class HouseholdAPI {
  static fetchHouseholds() {
    return axios.get(`${baseUrl}/households`);
  }
}

export default HouseholdAPI;
