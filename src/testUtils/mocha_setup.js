require('env-test');
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-class-properties', 'istanbul'],
});
require('@babel/polyfill');
require('ignore-styles');
require('./dom');
require('./helpers');