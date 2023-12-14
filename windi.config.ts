import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import plugin from 'windicss/plugin'

export default defineConfig({
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px'
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: [
    plugin(({ addBase }) => {
      const MAX = 20
      const addRawCss = {}
      const createCss = (index: number, d = 'x') => {
        const upd = d.toUpperCase()
        return {
          [`*> .enter-${d}:nth-child(${index})`]: {
            transform: `translate${upd}(50px)`
          },
          [`*> .-enter-${d}:nth-child(${index})`]: {
            transform: `translate${upd}(-50px)`
          },
          [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
            'z-index': `${16 - index}`,
            opacity: '0',
            animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
            'animation-fill-mode': 'forwards',
            'animation-delay': `${(index * 1) / 10}s`
          }
        }
      }
      for (let index = 1; index < MAX; index++) {
        Object.assign(addRawCss, {
          ...createCss(index, 'x'),
          ...createCss(index, 'y')
        })
      }
      addBase({
        ...addRawCss,
        [`@keyframes enter-x-animation`]: {
          to: {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        [`@keyframes enter-y-animation`]: {
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      })
    }),
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.skew-10deg': {
          transform: 'skewY(-10deg)'
        },
        '.skew-15deg': {
          transform: 'skewY(-15deg)'
        }
      }
      addUtilities(newUtilities)
    }),
    plugin(({ addComponents }) => {
      const buttons = {
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600'
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd'
          }
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a'
          }
        }
      }
      addComponents(buttons)
    }),
    plugin(({ addDynamic, variants }) => {
      addDynamic(
        'skew',
        ({ Utility, Style }) => {
          return Utility.handler
            .handleStatic(Style('skew'))
            .handleNumber(0, 360, 'int', (number) => `skewY(-${number}deg)`)
            .createProperty('transform')
        },
        variants('skew')
      )
    }),
    require('windicss/plugin/filters'),
    require('windicss/plugin/forms'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/typography')({
      modifiers: ['DEFAULT', 'sm', 'lg', 'red']
    }),
    require('@windicss/plugin-question-mark'),
    require('@windicss/plugin-animations')({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000
      }
    })
  ]
})
