import * as franc from 'franc';
import ISO6391 from 'iso-639-1';
import translate from 'translate';
import { SUPPORTED_LANGUAGES } from '../types';

// Initialize translate
translate.engine = 'google';
translate.key = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY || '';

/**
 * Detects the language of a text string
 * @param text The text to detect language from
 * @returns ISO 639-1 language code (e.g., 'en', 'es', 'fr')
 */
export const detectLanguage = (text: string): string => {
  try {
    // Use franc for language detection
    const langCode = franc.franc(text, { minLength: 3 });
    
    // Convert 3-letter code to 2-letter ISO code
    if (langCode && langCode !== 'und') {
      const iso2Code = ISO6391.getCode(ISO6391.getName(langCode));
      
      // Check if the language is in our supported languages
      if (iso2Code && SUPPORTED_LANGUAGES.some(lang => lang.code === iso2Code)) {
        return iso2Code;
      }
    }
    
    // Default to English if detection fails or language not supported
    return 'en';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en';
  }
};

/**
 * Translates text from one language to another
 * @param text Text to translate
 * @param targetLang Target language code (ISO 639-1)
 * @param sourceLang Source language code (optional, auto-detected if not provided)
 * @returns Translated text
 */
export const translateText = async (
  text: string,
  targetLang: string,
  sourceLang?: string
): Promise<string> => {
  try {
    // If no source language provided, detect it
    const detectedSourceLang = sourceLang || detectLanguage(text);
    
    // If source and target are the same, no need to translate
    if (detectedSourceLang === targetLang) {
      return text;
    }
    
    // Translate the text
    const translated = await translate(text, {
      from: detectedSourceLang,
      to: targetLang
    });
    
    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
};

/**
 * Gets the language name from a language code
 * @param langCode ISO 639-1 language code
 * @returns Language name in English
 */
export const getLanguageName = (langCode: string): string => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.code === langCode);
  return language ? language.name : 'Unknown';
};

/**
 * Gets the native language name from a language code
 * @param langCode ISO 639-1 language code
 * @returns Language name in its native script
 */
export const getNativeLanguageName = (langCode: string): string => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.code === langCode);
  return language ? language.nativeName : 'Unknown';
};

/**
 * Formats a system prompt to instruct the AI to respond in a specific language
 * @param language ISO 639-1 language code
 * @returns System prompt for language instruction
 */
export const getLanguageSystemPrompt = (language: string): string => {
  const langName = getLanguageName(language);
  const nativeName = getNativeLanguageName(language);
  
  return `Please respond in ${langName} (${nativeName}) language. Ensure your entire response is in this language, including explanations and comments.`;
};