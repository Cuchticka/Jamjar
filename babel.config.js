module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react', // <-- enables JSX parsing
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
  ],
};