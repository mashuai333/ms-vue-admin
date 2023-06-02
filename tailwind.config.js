/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  corePlugins: {
    preflight: false
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg_color: 'var(--el-bg-color)',
        primary: 'var(--el-color-primary)',
        primary_light_9: 'var(--el-color-primary-light-9)',
        text_color_primary: 'var(--el-text-color-primary)',
        text_color_regular: 'var(--el-text-color-regular)',
        text_color_disabled: 'var(--el-text-color-disabled)'
      }
    }
    // screens: {
    //   //https://tailwindcss.com/docs/screens
    //   '2xl': { max: '1535px' },
    //   // => @media (max-width: 1535px) { ... }

    //   xl: { max: '1279px' },
    //   // => @media (max-width: 1279px) { ... }

    //   lg: { max: '1023px' },
    //   // => @media (max-width: 1023px) { ... }

    //   md: { max: '767px' },
    //   // => @media (max-width: 767px) { ... }

    //   sm: { max: '639px' }
    //   // => @media (max-width: 639px) { ... }
    // }
  }
}
