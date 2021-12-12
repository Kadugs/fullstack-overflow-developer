export default class ParamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParamError';
  }
}
