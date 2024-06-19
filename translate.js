import { readFileSync, writeFileSync } from 'fs';
import { post } from 'axios';

const translateText = async (text, targetLang) => {
    const response = await post('https://translation.googleapis.com/language/translate/v2', null, {
        params: {
            q: text,
            target: targetLang,
            key: 'YOUR_GOOGLE_TRANSLATE_API_KEY',
        },
    });

    return response.data.data.translations[0].translatedText;
};

const translateFile = async (sourceLangFile, targetLangFile, targetLang) => {
    const sourceData = JSON.parse(readFileSync(sourceLangFile, 'utf8'));
    const translatedData = {};

    for (const key in sourceData) {
        translatedData[key] = await translateText(sourceData[key], targetLang);
    }

    writeFileSync(targetLangFile, JSON.stringify(translatedData, null, 2), 'utf8');
};

translateFile('./locales/en.json', './locales/es.json', 'es')
    .then(() => console.log('Translation complete!'))
    .catch((err) => console.error(err));

// Run the script using the following command:
// yarn translate
