import { defineConfig, presetIcons } from 'unocss'

const faIconSource = 'https://fa.ruphine.com/6.4.0/svgs'
const faPresetIcon = (directory: string) => async (iconName: string) =>
  await fetch(`${faIconSource}/${directory}/${iconName}.svg`).then((res) => res.text())

export default defineConfig({
  presets: [
    presetIcons({
      cdn: 'https://esm.sh/',
      collections: {
        fab: faPresetIcon('brands'),
        far: faPresetIcon('regular'),
        fas: faPresetIcon('solid'),
        fat: faPresetIcon('thin'),
        fal: faPresetIcon('light'),
        fass: faPresetIcon('sharp-solid'),
        fasr: faPresetIcon('sharp-regular'),
      },
      extraProperties: {
        'display': 'inline-block',
      },
      customizations: {
        transform (svg, collection) {
          // regex to check if collection is font awesome
          const fontAwesomeCollectionRegex = /^fa(?:b|r|s|l|d|t|ss|sr)$/i
          if (fontAwesomeCollectionRegex.test(collection)) {
            return svg.replace('<path', '<path fill="currentColor"')
          }
          return svg
        },
      },
    }),
  ],
})
