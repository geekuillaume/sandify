import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/libExports.js",
  output: [
    {
      file: "dist/libExports.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/libExports.cjs.js",
      format: "cjs",
      name: "sandify",
      sourcemap: true,
    },
  ],
  plugins: [commonjs(), resolve()],
};
