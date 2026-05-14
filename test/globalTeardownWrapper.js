require('ts-node').register({
    project: require('path').join(__dirname, '..', 'tsconfig.json'),
    transpileOnly: true,
    compilerOptions: { module: 'commonjs' }
});
module.exports = require('./globalTeardown').default;
