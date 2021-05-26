import { printReceived } from 'jest-matcher-utils';

declare global {
    namespace jest {
        interface Matchers<R> {
            isStringOrNumber(): R;
            isNullableStringOrNumber(): R;
        }

        interface Expect {
            isStringOrNumber(): () => void;
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
//
// export function anyOf(received: any, ...oneOfExpectedTypes: any[]): jest.CustomMatcherResult {
//
//     function oneOf(received: any, ...oneOfExpectedTypes: any[]) {
//
//
//         for (var i = 0; i < oneOfExpectedTypes.length; i++) {
//             if (received === null) {
//                 if (oneOfExpectedTypes[i] === null)
//                     return true;
//             } else if (received.constructor === oneOfExpectedTypes[i]) {
//                 return true
//             }
//         }
//         return false
//     }
//
//     return {
//         message: () =>
//             `recieved ${received} has unexpected type`,
//         pass: oneOf(received, oneOfExpectedTypes)
//     };
// }
//
// expect.extend({
//     anyOf(received, expected) {
//         function oneOf(received: any, expected: any[]) {
//             for (var i = 0; i < expected.length; i++) {
//                 if (received === null) {
//                     if (expected[i] === null)
//                         return true;
//                 } else if (received.constructor === expected[i]) {
//                     return true
//                 }
//             }
//             return false
//         }
//
//         return {
//             message: () =>
//                 `recieved ${received} has unexpected type`,
//             pass: oneOf(received, expected)
//         };
//     }
// });
//
// expect.extend({
//     toBeOneOf(received, constructors = [String, Number]) {
//         const pass = !!constructors.find(c => received.constructor === c);
//         if (pass) {
//             return {
//                 message: () => `looks good`,
//                 pass: true,
//             };
//         } else {
//             return {
//                 message: () => `no so good....`,
//                 pass: false,
//             };
//         }
//     },
// });

