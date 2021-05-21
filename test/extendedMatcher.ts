declare global {
    namespace jest {
        interface Matchers<R> {
            anyOf(received: any,...oneOfExpectedTypes: any[]): R;
        }

        interface Expect {
            anyOf(received: any,...oneOfExpectedTypes: any[]): () => void;
        }
    }
}

export function anyOf(received: any): jest.CustomMatcherResult {
    return {
        message: () =>
            `recieved ${received}, but expected instance of 'number' or 'string'`,
        pass: typeof received == 'boolean' || received instanceof Boolean,

    };
}

// export function anyOf(received: any, ...oneOfExpectedTypes: any[]): jest.CustomMatcherResult {
//
//     function oneOf(received: any, ...oneOfExpectedTypes: any[]) {
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


expect.extend({
    anyOf
});