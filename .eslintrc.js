// .eslintignore 忽略一些规则

module.exports = {
    root: true, // 是否为根目录
    parserOptions: {    //使用babel-eslint 转换器
        parser: 'babel-eslint'
    },
    env: {  // 面向的环节是浏览器
        browser: true
    },
    extends: [
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'  // standard 目前最流行的js校验标准
    ],
    globals: {  //
        NODE_ENV: false
    },
    rules: {
        // allow async-await
        'generator-star-spacing': 'off', // generator 一开始的函数的*是否有空格
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 添加，分号必须
        semi: ['error', 'always'],
        'no-unexpected-multiline': 'off',
        'space-before-function-paren': ['error', 'never'],
        // 'quotes': ["error", "double", { "avoidEscape": true }]
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true
            }
        ]
    }
};
