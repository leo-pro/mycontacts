export default class APIError extends Error {
  response: Response;

  body;

  constructor(response: Response, body: { error: string; }) {
    super();

    this.name = 'APIError';
    this.response = response;
    this.body = body;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}
