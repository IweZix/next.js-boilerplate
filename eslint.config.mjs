import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

// Modules pour Prettier
import prettierConfig from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules, // Désactive les règles en conflit avec Prettier
      "prettier/prettier": "error", // Affiche une erreur si le formatage n'est pas respecté
    },
    ignorePatterns: [
      "node_modules/",
      "dist/",
      ".next/",
      ".vercel/",
      "out/",
      "coverage/",
      "public/",
      "components/ui/",
    ],
  },
]

export default eslintConfig