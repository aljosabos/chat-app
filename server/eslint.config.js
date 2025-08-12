import { fileURLToPath } from "url";
import { dirname } from "path";
import eslint from "@eslint/js";
import * as tseslint from "typescript-eslint";
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

  // Specifične konfiguracije po fajlovima:
  files: ["*.d.ts"],
  rules: {
    "no-unused-vars": "off",
  },

  // Možeš koristiti `overrides`-like pristup kroz `overrides` polje ako flat config verzija to podržava
  overrides: [
    {
      files: ["*.d.ts"],
      rules: {
        "no-unused-vars": "off",
      },
    },
  ],
};
