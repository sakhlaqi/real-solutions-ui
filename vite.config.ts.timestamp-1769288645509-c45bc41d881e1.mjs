// vite.config.ts
import { defineConfig } from "file:///Users/salmanakhlaqi/Public/projects/real-solutions/ui/node_modules/vite/dist/node/index.js";
import react from "file:///Users/salmanakhlaqi/Public/projects/real-solutions/ui/node_modules/@vitejs/plugin-react/dist/index.js";
import { resolve } from "path";
import dts from "file:///Users/salmanakhlaqi/Public/projects/real-solutions/ui/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/salmanakhlaqi/Public/projects/real-solutions/ui";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*"],
      exclude: ["**/*.stories.tsx", "**/*.test.tsx"]
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__vite_injected_original_dirname, "src/index.ts"),
        base: resolve(__vite_injected_original_dirname, "src/base/index.ts"),
        layout: resolve(__vite_injected_original_dirname, "src/layout/index.ts"),
        navigation: resolve(__vite_injected_original_dirname, "src/navigation/index.ts"),
        forms: resolve(__vite_injected_original_dirname, "src/forms/index.ts"),
        buttons: resolve(__vite_injected_original_dirname, "src/buttons/index.ts"),
        "data-display": resolve(__vite_injected_original_dirname, "src/data-display/index.ts"),
        feedback: resolve(__vite_injected_original_dirname, "src/feedback/index.ts"),
        overlay: resolve(__vite_injected_original_dirname, "src/overlay/index.ts"),
        typography: resolve(__vite_injected_original_dirname, "src/typography/index.ts"),
        utility: resolve(__vite_injected_original_dirname, "src/utility/index.ts")
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        const ext = format === "es" ? "js" : "cjs";
        return `${entryName}.${ext}`;
      }
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        preserveModules: false,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime"
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "styles/index.css";
          }
          return assetInfo.name || "assets/[name][extname]";
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2FsbWFuYWtobGFxaS9QdWJsaWMvcHJvamVjdHMvcmVhbC1zb2x1dGlvbnMvdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zYWxtYW5ha2hsYXFpL1B1YmxpYy9wcm9qZWN0cy9yZWFsLXNvbHV0aW9ucy91aS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2FsbWFuYWtobGFxaS9QdWJsaWMvcHJvamVjdHMvcmVhbC1zb2x1dGlvbnMvdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBkdHMoe1xuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyonXSxcbiAgICAgIGV4Y2x1ZGU6IFsnKiovKi5zdG9yaWVzLnRzeCcsICcqKi8qLnRlc3QudHN4J10sXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgICAgYmFzZTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYmFzZS9pbmRleC50cycpLFxuICAgICAgICBsYXlvdXQ6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xheW91dC9pbmRleC50cycpLFxuICAgICAgICBuYXZpZ2F0aW9uOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9uYXZpZ2F0aW9uL2luZGV4LnRzJyksXG4gICAgICAgIGZvcm1zOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9mb3Jtcy9pbmRleC50cycpLFxuICAgICAgICBidXR0b25zOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9idXR0b25zL2luZGV4LnRzJyksXG4gICAgICAgICdkYXRhLWRpc3BsYXknOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9kYXRhLWRpc3BsYXkvaW5kZXgudHMnKSxcbiAgICAgICAgZmVlZGJhY2s6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2ZlZWRiYWNrL2luZGV4LnRzJyksXG4gICAgICAgIG92ZXJsYXk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL292ZXJsYXkvaW5kZXgudHMnKSxcbiAgICAgICAgdHlwb2dyYXBoeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdHlwb2dyYXBoeS9pbmRleC50cycpLFxuICAgICAgICB1dGlsaXR5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlsaXR5L2luZGV4LnRzJyksXG4gICAgICB9LFxuICAgICAgZm9ybWF0czogWydlcycsICdjanMnXSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0LCBlbnRyeU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZXh0ID0gZm9ybWF0ID09PSAnZXMnID8gJ2pzJyA6ICdjanMnO1xuICAgICAgICByZXR1cm4gYCR7ZW50cnlOYW1lfS4ke2V4dH1gO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC9qc3gtcnVudGltZSddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIHByZXNlcnZlTW9kdWxlczogZmFsc2UsXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICByZWFjdDogJ1JlYWN0JyxcbiAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgICAncmVhY3QvanN4LXJ1bnRpbWUnOiAnanN4UnVudGltZScsXG4gICAgICAgIH0sXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09PSAnc3R5bGUuY3NzJykge1xuICAgICAgICAgICAgcmV0dXJuICdzdHlsZXMvaW5kZXguY3NzJztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFzc2V0SW5mby5uYW1lIHx8ICdhc3NldHMvW25hbWVdW2V4dG5hbWVdJztcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVixTQUFTLG9CQUFvQjtBQUNqWCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUhoQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixrQkFBa0I7QUFBQSxNQUNsQixTQUFTLENBQUMsVUFBVTtBQUFBLE1BQ3BCLFNBQVMsQ0FBQyxvQkFBb0IsZUFBZTtBQUFBLElBQy9DLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsUUFDTCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQ3hDLE1BQU0sUUFBUSxrQ0FBVyxtQkFBbUI7QUFBQSxRQUM1QyxRQUFRLFFBQVEsa0NBQVcscUJBQXFCO0FBQUEsUUFDaEQsWUFBWSxRQUFRLGtDQUFXLHlCQUF5QjtBQUFBLFFBQ3hELE9BQU8sUUFBUSxrQ0FBVyxvQkFBb0I7QUFBQSxRQUM5QyxTQUFTLFFBQVEsa0NBQVcsc0JBQXNCO0FBQUEsUUFDbEQsZ0JBQWdCLFFBQVEsa0NBQVcsMkJBQTJCO0FBQUEsUUFDOUQsVUFBVSxRQUFRLGtDQUFXLHVCQUF1QjtBQUFBLFFBQ3BELFNBQVMsUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxRQUNsRCxZQUFZLFFBQVEsa0NBQVcseUJBQXlCO0FBQUEsUUFDeEQsU0FBUyxRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLE1BQ3BEO0FBQUEsTUFDQSxTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVSxDQUFDLFFBQVEsY0FBYztBQUMvQixjQUFNLE1BQU0sV0FBVyxPQUFPLE9BQU87QUFDckMsZUFBTyxHQUFHLFNBQVMsSUFBSSxHQUFHO0FBQUEsTUFDNUI7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyxhQUFhLG1CQUFtQjtBQUFBLE1BQ3BELFFBQVE7QUFBQSxRQUNOLGlCQUFpQjtBQUFBLFFBQ2pCLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLHFCQUFxQjtBQUFBLFFBQ3ZCO0FBQUEsUUFDQSxnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGNBQUksVUFBVSxTQUFTLGFBQWE7QUFDbEMsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU8sVUFBVSxRQUFRO0FBQUEsUUFDM0I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBYztBQUFBLElBQ2QsV0FBVztBQUFBLElBQ1gsYUFBYTtBQUFBLEVBQ2Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
