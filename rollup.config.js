export default {
  input: 'dist/esm/index.js',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs',
    sourcemap: true,
    inlineDynamicImports: true,
    exports: 'default',
  },
  external: ['dotenv', '@changesets/get-github-info'],
};
