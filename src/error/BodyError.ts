export default class BodyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BodyError';
  }
}
