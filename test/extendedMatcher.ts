declare global {
  namespace jest {
      interface Matchers<R, T = void> {
        isStringOrNumber(): R;
      }
  }
}

export function isStringOrNumber(received:any): jest.CustomMatcherResult {
  return {
    pass: typeof received == 'string' || received instanceof String || typeof received == 'number' || received instanceof Number,
    message: () =>
      `expected null or instance of 'number' or 'string', but received ${this.utils.printReceived(received)}`,
    };
}
