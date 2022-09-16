import axios from 'axios';

export default class RegisterBisService {
  public processRegistration(account: any): Promise<any> {
    return axios.post('api/register', account);
  }
}
