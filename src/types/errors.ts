export class GraphApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'GraphApiError';
  }
}