import globals from "globals";
import pluginImport from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";
import js from "@eslint/js";

export default [
  // 1. Aplica la configuración recomendada de ESLint
  js.configs.recommended,

  {
    // Aplica a todos los archivos JavaScript
    files: ["**/*.js"],

    // Configuración de plugins (Reemplaza "plugins": ["import"])
    plugins: {
      import: pluginImport,
    },

    // Reemplaza "env" y "parserOptions"
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6,
        logger: "readonly",
      },
    },

    // Configuración de reglas (Tus reglas exactas adaptadas)
    rules: {
      // Configuración base de eslint-plugin-import/errors
      ...pluginImport.configs.errors.rules,

      // Tus reglas personalizadas
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "res|next|^err",
        },
      ],
      "arrow-body-style": ["error", "as-needed"],
      "no-param-reassign": [
        "error",
        {
          props: false,
        },
      ],
      "no-console": "warn",
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      "func-names": "off",
      "space-unary-ops": "error",
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "comma-dangle": "off",
      "max-len": "off",
      "import/extensions": "off",
      "no-underscore-dangle": "off",
      "consistent-return": "off",
      radix: "off",
      "no-shadow": [
        "error",
        {
          hoist: "all",
          allow: ["resolve", "reject", "done", "next", "err", "error"],
        },
      ],
      "no-unused-expressions": "off",
    },
  },

  // 2. Desactiva las reglas que choquen con Prettier (Reemplaza el "extends": ["prettier"])
  eslintConfigPrettier,
];
