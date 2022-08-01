import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async makeRequest(path: string, options:any) {
    await delay(1000);

    const { body, method } = options;

    const headers = new Headers();

    if (body) {
      headers.append('Content-type', 'application/json');
    }

    if (options.headers) {
      Object.entries(headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method,
      body: JSON.stringify(body),
      headers,
    });

    const contentType = response.headers.get('Content-Type');

    let responseBody = null;

    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }

  get(path: string, options?: any) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path: string, options:any) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path: string, options:any) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path: string, options?:any) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }
}

export default HttpClient;
