import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'fr'; // Add more languages as needed

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en', // Default language
  setLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode; // Properly type the children prop
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from AsyncStorage when the component mounts
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
          console.log('Loaded language from storage:', storedLanguage);
          setLanguage(storedLanguage as Language);
        }
      } catch (error) {
        console.error('Failed to load language from storage:', error);
      }
    };

    loadLanguage();
  }, []);

  useEffect(() => {
    // Save language to AsyncStorage whenever it changes
    const saveLanguage = async () => {
      try {
        console.log('Saving language to storage:', language);
        await AsyncStorage.setItem('language', language);
      } catch (error) {
        console.error('Failed to save language to storage:', error);
      }
    };

    saveLanguage();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
