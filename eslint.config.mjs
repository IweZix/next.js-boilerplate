import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Modules pour Prettier
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/",
      "dist/",
      ".next/",
      ".vercel/",
      "out/",
      "coverage/",
      "public/",
      "components/ui/**/*",
      "api/**/*",
    ],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": ["error", { semi: true }], // ✅ Imposer les `;`
      "semi": ["error", "always"], // ✅ ESLint impose aussi les `;`
    },
  },
];

export default eslintConfig;