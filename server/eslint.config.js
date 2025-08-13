import { fileURLToPath } from "url";
import { dirname } from "path";
import perfectionistPlugin from "eslint-plugin-perfectionist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  ignores: ["**/*.js"],

  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: __dirname,
    },
  },

  plugins: {
    perfectionist: perfectionistPlugin,
  },

  rules: {
    // global rules
  },

  files: ["*.d.ts"],
  rules: {
    "no-unused-vars": "off",
  },

  overrides: [
    {
      files: ["*.d.ts"],
      rules: {
        "no-unused-vars": "off",
      },
    },
  ],
};
