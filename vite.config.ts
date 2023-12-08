import react from "@vitejs/plugin-react-swc";
import million from "million/compiler";
import { defineConfig, splitVendorChunkPlugin } from "vite";

export default defineConfig({
  plugins: [million.vite({ auto: true }), react(), splitVendorChunkPlugin()],
});
