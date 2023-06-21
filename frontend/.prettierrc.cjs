module.exports = {
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "css",
  "singleAttributePerLine": true,
  "jsxSingleQuote": false,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "embeddedLanguageFormatting": "auto",
  "parser": "typescript",
  "plugins": [require("@trivago/prettier-plugin-sort-imports"), require("prettier-plugin-tailwindcss")],
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
