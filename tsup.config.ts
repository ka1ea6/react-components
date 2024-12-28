import { defineConfig, type Options } from "tsup";
import react18Plugin from "esbuild-plugin-react18";
import cssPlugin from "esbuild-plugin-react18-css";
import { rdiPlugin } from "esbuild-plugin-rdi";
import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';

export default defineConfig(
  (options: Options) =>
    ({
      format: ["cjs", "esm"],
      target: "es2019",
      entry: ["./src/**"],
      treeshake: false,
      sourcemap: false,
      clean: !options.watch,
      bundle: true,
      minify: !options.watch,
      metafile: true,
      ignoreWatch: ['**/*.mdx'], // Ignore .mdx during watch
      esbuildOptions(options) {
        options.loader = {
          ...options.loader,
          '.mdx': 'text', // Treat .mdx files as plain text
        };
      },
      esbuildPlugins: [
        preserveDirectivesPlugin({
          directives: ['use client', 'use strict', 'use server'],
          include: /\.(js|ts|jsx|tsx)$/,
          exclude: /node_modules/,
        }),
        react18Plugin({ disableJSXRequireDedup: true }),
        cssPlugin({ generateScopedName: "[folder]__[local]" }),
        rdiPlugin(),
        
      ],
      ...options,
    }) as Options,
);
