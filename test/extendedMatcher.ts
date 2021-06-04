import { printReceived } from 'jest-matcher-utils';

declare global {
    namespace jest {
        interface Matchers<R> {
            isStringOrNumber(): R;
            isNullableString(): R;
            isNullableNumber(): R;
            isNullableStringOrNumber(): R;
        }

        interface Expect {
            isStringOrNumber(): () => void;
            isNullableString(): () => void;
            isNullableNumber(): () => void;
            isNullableStringOrNumber(): () => void;
        }
    }
}

export function isStringOrNumber(received:any): jest.CustomMatcherResult {
    return {
        pass: typeof received == 'string' || received instanceof String || typeof received == 'number' || received instanceof Number,
        message: () =>
            `expected null or instance of 'number' or 'string', but received ${printReceived(received)}`,
    };
}

export function isNullableString(received:any): jest.CustomMatcherResult {
    return {
        pass: received === null || typeof received == 'string' || received instanceof String,
        message: () =>
            `expected null or instance of 'string', but received ${printReceived(received)}`,
    };
}

export function isNullableNumber(received:any): jest.CustomMatcherResult {
    return {
        pass: received === null || typeof received == 'number' || received instanceof Number,
        message: () =>
            `expected null or instance of 'number', but received ${printReceived(received)}`,
    };
}

export function isNullableStringOrNumber(received:any): jest.CustomMatcherResult {
    return {
        pass: received === null || typeof received == 'string' || received instanceof String || typeof received == 'number' || received instanceof Number,
        message: () =>
            `expected null or instance of 'number' or 'string', but received ${printReceived(received)}`,
    };
}

expect.extend({
    isNullableStringOrNumber
});


expect.extend({
    isStringOrNumber
});

expect.extend({
    isNullableString
});

expect.extend({
    isNullableNumber
});