module.exports = {
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "singleAttributePerLine": true,
  "bracketSameLine": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "embeddedLanguageFormatting": "auto",
  "vueIndentScriptAndStyle": false,
  "parser": "typescript",
  "plugins": [require("@trivago/prettier-plugin-sort-imports"), require("prettier-plugin-tailwindcss")],
  "pluginSearchDirs": false,
  "importOrder": ["^@/scss/(.*)$", "^react(.*)$", "^next/(.*)$", "@^/layouts/(.*)$", "^@/components/(.*)$", "^@/lib/(.*)$", "<THIRD_PARTY_MODULES>", "^[./]"],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true,
  "importOrderCaseInsensitive": true,
  "overrides": [
    {
      "files": "*.scss",
      "options": { "parser": "scss" }
    }
  ]
};
