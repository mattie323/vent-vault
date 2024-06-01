module.exports = function (api) {
    api.cache(true);

    const presets = [['react-app', { absoluteRuntime: false }],'@babel/preset-typescript'];
    const plugins = [['babel-plugin-styled-components']];

    return {
        presets,
        plugins,
    };
};