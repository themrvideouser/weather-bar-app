import electron from 'electron'
import deepmerge from 'deepmerge'

// Load shared Electron / Vue i18n languages
import enLocale from './en'

// Define Supported Languages for Electron
const supportedLanguges = ['en']

// Merge all the language files
const messages = deepmerge.all([enLocale])

// Figure out which language for Electron to use
const app = electron.app ? electron.app : electron.remote.app
let locale = app.getLocale().substring(0, 2)

// Fallback on English if we don't support users language
if (supportedLanguges.indexOf(locale) === -1) {
  locale = 'en'
}

export function i18n (keyword, template) {
  let translation = keyword.split('.').reduce((o, i) => o[i], messages[locale])
  if (translation === undefined) {
    translation = keyword
  }

  if (typeof template === 'object') {
    for (let key in template) {
      if (template.hasOwnProperty(key)) {
        translation = translation.replace('{' + key + '}', template[key])
      }
    }
  }

  return translation
}