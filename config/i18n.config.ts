import i18n from 'i18n';
import { existsSync } from 'fs';
import path from "path"
const localesDirectory = path.join(__dirname, "../locales");
const locales = ['en', 'es'];
const defaultLocale = 'es';

if (!existsSync(localesDirectory)) {
  throw new Error(`Locales directory not found: ${localesDirectory}`);
}

if (!locales.includes(defaultLocale)) {
  throw new Error(`Invalid default locale: ${defaultLocale}. Expected one of ${locales}`);
}

i18n.configure({
  objectNotation: true,
  locales,
  defaultLocale,
  directory: path.join(__dirname, "../locales"),
});

export const translation = i18n;
