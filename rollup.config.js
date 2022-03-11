export default {
  input: "dist/esm/index.js",
  output: {
    file: "dist/plugin.cjs.js",
    format: "cjs",
    sourcemap: true,
    inlineDynamicImports: true,
    exports: "default",
  },
  external: ["dotenv", "@changesets/get-github-info"],
};
