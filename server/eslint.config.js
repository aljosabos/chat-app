import { fileURLToPath } from "url";
import { dirname } from "path";
import eslint from "@eslint/js";
import * as tseslint from "typescript-eslint";
import perfectionistPlugin from "eslint-plugin-perfectionist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  {
    ignores: ["**/*.js"],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    plugins: {
      perfectionist: perfectionistPlugin,
    },
    rules: {
      // "perfectionist/sort-objects": ["error", { type: "natural" }],
      // "perfectionist/sort-imports": ["error", { type: "natural" }],
      // "perfectionist/sort-named-exports": ["error", { type: "natural" }],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  }
);
