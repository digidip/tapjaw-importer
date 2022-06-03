module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        files: ['*.ts']
    },
    plugins: [
        '@typescript-eslint',
        'prettier'
    ],
    root: true,
    rules: {
        quotes: ['error', 'single'],
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: 'abstract .*' }],
        'max-len': [
            'error',
            { "code": 120, "ignoreUrls": true, ignorePattern: '^(import|export) .*' }
        ],
        'prettier/prettier': 2,
    }
};
