import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get(path: string) {
    await delay(1000);

    const response = await fetch(`${this.baseURL}${path}`);

    const contentType = response.headers.get('Content-Type');

    let body = null;

    if (contentType?.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }
}

export default HttpClient;
