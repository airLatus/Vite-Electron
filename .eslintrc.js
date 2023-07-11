module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  }, //定义eslint依赖的插件
  plugins: ["prettier", "simple-import-sort"], //定义文件继承的代码规范
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "vue-global-api",
  ],
  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          component: "always",
          normal: "always",
          void: "any",
        },
        math: "always",
        svg: "always",
      },
    ],
    "vue/require-default-prop": "off",
    "vue/no-v-html": "off",
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
