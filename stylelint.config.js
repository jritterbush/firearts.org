module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
    rules: {
        indentation: 4,
        'string-quotes': 'single',
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
            },
        ],
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null,
    },
};
