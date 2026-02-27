const { join, resolve } = require('path');

const main = ({ name, shouldMinimize }) => ({
    entry: join(__dirname, './src/index.ts'),
    mode: shouldMinimize ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            module: 'esnext'
                        }
                    }
                },
                exclude: /node_modules/,
            },
        ],
    },
    devtool: shouldMinimize ? undefined : 'inline-source-map',
    optimization: {
        minimize: shouldMinimize,
        usedExports: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        library: {
            name: 'nodeApi',
            type: 'umd',
        },
        globalObject: 'this',
        filename: shouldMinimize ? `${name}.min.js` : `${name}.js`,
        path: resolve(__dirname, 'dist'),
    }
});
const devConfig = main({ name: 'node-api', shouldMinimize: false });
const prodConfig = main({ name: 'node-api', shouldMinimize: true });

module.exports = [devConfig, prodConfig];
