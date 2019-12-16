const { join, resolve } = require('path');


const main = (name, minimize) => ({
    entry: join(__dirname, './src/index.ts'),
    mode: minimize ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devtool: minimize ? undefined : 'inline-source-map',
    optimization: {
        minimize,
        usedExports: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        library: 'nodeApi',
        libraryTarget: 'umd',
        globalObject: 'this',
        filename: minimize ? `${name}.min.js` : `${name}.js`,
        path: resolve(__dirname, 'dist'),
    }
});

module.exports = [
    main('node-api', false),
    main('node-api', true)
];