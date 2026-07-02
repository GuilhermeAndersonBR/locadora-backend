import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [

    js.configs.recommended,

    ...tseslint.configs.recommended,

    ...pluginVue.configs["flat/recommended"],

    {
        files: [
            "**/*.{js,mjs,cjs,ts,vue}"
        ],

        languageOptions: {
            globals: globals.browser
        },

        rules: {

            "semi": [
                "error",
                "always"
            ],

            "quotes": [
                "error",
                "double"
            ],

            "indent": [
                "error",
                4
            ],

            "comma-dangle": [
                "error",
                "never"
            ]
        }
    }

];