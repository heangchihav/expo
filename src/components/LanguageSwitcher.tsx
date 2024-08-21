import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter, Href } from 'expo-router';
import { usePathname } from 'expo-router';
import { Colors } from '../constants/Colors';
import { ThemeContext } from '../contexts/ThemeContext';

type Language = 'en' | 'fr'; // Ensure this matches your Language type

const languages = [
  { code: 'en', name: 'English', avatar:'https://res.cloudinary.com/da8ox9rlr/image/upload/v1724228796/flags/4x3/sh_htdmf3.svg'},
  { code: 'fr', name: 'French', avatar: 'https://res.cloudinary.com/da8ox9rlr/image/upload/v1724228854/flags/4x3/wf_jiuzpd.svg' },
  // Add more languages as needed
];

export default function LanguageSwitcher() {
  const { setLanguage, language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    console.log(`Language changed to: ${newLanguage}`);
    setLanguage(newLanguage);

    // Extract the current path without the language prefix
    const pathSegments = pathname.split('/').slice(2);
    const currentPath = pathSegments.length ? pathSegments.join('/') : '';

    // Ensure the path is valid and matches the expected Href type
    const newPath: Href = `/${newLanguage}/${currentPath}`;

    // Navigate to the new path
    router.push(newPath);
    setDropdownVisible(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language);
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const isDarkMode = theme === 'dark'; // Determine if dark mode is active

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          { backgroundColor: isDarkMode ? Colors.dark.tabIconSelected : Colors.light.tabIconSelected, borderColor: isDarkMode ? Colors.dark.text : Colors.light.text }
        ]}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
<Image
  source={{ uri: currentLanguage?.avatar }}
  style={styles.avatar}
/>


      </TouchableOpacity>

      {dropdownVisible && (
        <View style={[
          styles.dropdownMenu,
          { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }
        ]}>
          <FlatList
            style={{ backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }}
            data={languages}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.languageItem,
                  { backgroundColor: isDarkMode ? Colors.dark.tint : Colors.light.tint }
                ]}
                onPress={() => handleLanguageChange(item.code as Language)}
              >
                <Image source={{ uri: item.avatar }} style={styles.languageAvatar} />
                <Text style={[styles.languageName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    borderRadius: 50,
    borderWidth: 1,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  languageName: {
    fontSize: 16,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    width: 105,
    borderRadius: 17,
    padding: 5,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 7,
    margin: 1,
    borderRadius: 10,
  },
  languageAvatar: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight: 10,
  },
});
