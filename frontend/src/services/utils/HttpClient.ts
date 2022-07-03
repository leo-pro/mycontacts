import delay from '../../utils/delay';

class HttpClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get(path: string) {
    const response = await fetch(`${this.baseURL}${path}`);

    await delay(1000);

    return response.json();
  }
}

export default HttpClient;
