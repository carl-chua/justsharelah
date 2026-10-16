import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Migrated from Create React App: keep JSX in .js files, the REACT_APP_
// env prefix, the build/ output dir and the dev port working as before.
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
      // Some deps (e.g. randombytes) read Node's `global`; the production
      // build rewrites it, the dev pre-bundle needs it spelled out.
      define: { global: "globalThis" },
    },
  },
  // CRA aliased react-native to react-native-web; react-web-gifted-chat relies on it.
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "react-art": path.resolve(__dirname, "src/shims/react-art.js"),
    },
  },
  envPrefix: "REACT_APP_",
  define: { "process.env.PUBLIC_URL": JSON.stringify("") },
  build: { outDir: "build" },
  server: { port: 3000 },
});
