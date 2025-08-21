import antfu from '@antfu/eslint-config';

export default antfu(
  {
    typescript: true,
    vue: true,
    stylistic: {
      semi: true,
    },
    ignores: [
      '.env.local',
      'eslint.config.mjs',
    ],
  },
  {
    files: ['**/src/**/*.{js,jsx,ts,tsx,vue}'],
    rules: {
      /**
       * JS/TS
       *
       * WARNING!
       * Часть правил у eslint DEPRECATED и они были перенесены в отдельную либу https://eslint.style/
       * При желании что-то измененить в правилах желательно уточнить, "а не депрекейтнуто ли правило, которое я хочу добавить?"
       * Иначе возможны непредвиденные трансформации :)
       * Правила из новой либы (https://eslint.style/) для antfu указываются с префиксом styles/...
       */
      curly: ['error', 'all'],
      'style/multiline-ternary': ['error', 'always'],
      'style/arrow-parens': ['error', 'always'],
      'style/brace-style': ['error', '1tbs'],
      'style/object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, minProperties: 1 },
          ObjectPattern: { multiline: true, minProperties: 1 },
          ImportDeclaration: { multiline: true, minProperties: 2 },
          ExportDeclaration: { multiline: true, minProperties: 2 },
        },
      ],
      'style/array-bracket-newline': ['error', { minItems: 1 }],
      'style/array-element-newline': [
        'error',
        {
          ArrayExpression: { multiline: true, minItems: 1 },
          ArrayPattern: { multiline: true, minItems: 1 },
        },
      ],
      'style/function-paren-newline': ['error', { minItems: 3 }],
      'id-length': ['error', { exceptions: ['i', 'l', 'k', 'a', 'b'], min: 2 }],
      'func-style': ['error', 'declaration'],
      'ts/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      /**
       * Imports
       */
      'no-duplicate-imports': ['error', { includeExports: true }],
      'import/no-duplicates': ['error', { considerQueryString: true }],

      /**
       * Vue
       */
      'vue/custom-event-name-casing': 'off',
      'vue/no-template-shadow': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 1 },
          multiline: { max: 1 },
        },
      ],
    },
  },
);
