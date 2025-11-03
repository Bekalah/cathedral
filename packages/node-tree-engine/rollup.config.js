import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/index.ts",
  output: [
    { file: "dist/index.mjs", format: "es", sourcemap: true },
    { file: "dist/index.js", format: "cjs", exports: "auto", sourcemap: true },
  ],
  external: [
    "graphql",
    "circus",
    "async-mutex",
    "fast-xml-parser",
    "marked",
    /^d3-/,
  ],
  plugins: [resolve(), typescript({ tsconfig: "./tsconfig.json" })],
};
