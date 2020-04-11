import axios from 'axios';
import resolveBaseUrl from '.';

const baseUrl = resolveBaseUrl();

class UserAPI {
  static loginUser(userData: any) {
    return axios.post(`${baseUrl}/login`, userData);
  }

  static currentUser(userId: any) {
    return axios.get(`${baseUrl}/user/${userId}`);
  }

  static fetchUsers() {
    return axios.get(`${baseUrl}/users`);
  }

  static editUser(userData: any, userId: string) {
    return axios.patch(`${baseUrl}/users/${userId}`, userData);
  }

  static deleteUser(userId: string) {
    return axios.delete(`${baseUrl}/users/${userId}`);
  }

  static addUser(userData: any) {
    return axios.post(`${baseUrl}/users/`, userData);
  }
}

export default UserAPI;
