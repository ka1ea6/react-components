import { defineConfig, type Options } from "tsup";
import react18Plugin from "esbuild-plugin-react18";
import cssPlugin from "esbuild-plugin-react18-css";
import { rdiPlugin } from "esbuild-plugin-rdi";

export default defineConfig(
  (options: Options) =>
    ({
      format: ["cjs", "esm"],
      target: "es2019",
      entry: ["./src/**"],
      sourcemap: false,
      clean: !options.watch,
      bundle: true,
      minify: !options.watch,
      ignoreWatch: ['**/*.mdx'], // Ignore .mdx during watch
      esbuildOptions(options) {
        options.loader = {
          ...options.loader,
          '.mdx': 'text', // Treat .mdx files as plain text
        };
      },
      esbuildPlugins: [
        react18Plugin({ disableJSXRequireDedup: true }),
        cssPlugin({ generateScopedName: "[folder]__[local]" }),
        rdiPlugin(),
      ],
      ...options,
    }) as Options,
);
