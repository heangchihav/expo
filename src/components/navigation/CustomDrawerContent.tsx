import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useContext, } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomDrawerContent = (props: any) => {
    const { theme } = useContext(ThemeContext);

    const isDarkMode = theme === 'dark';
    const router = useRouter();
    const { bottom } = useSafeAreaInsets();

    // Get the screen width
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}
                scrollEnabled={false}
                contentContainerStyle={{
                    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
                }}>

                <View style={styles.imageContainer}>
                    {/* Background Image */}
                    <Image
                        source={{ uri: 'https://res.cloudinary.com/da8ox9rlr/image/upload/v1724299578/icg/login_esxhtr.jpg' }}
                        style={{ width: screenWidth, height: 200 }}  // Full width and desired height
                        resizeMode="cover"
                    />
                    {/* Avatar and Text Inside the Image */}
                    <View style={styles.avatarTextContainer}>
                        <Image
                            source={{ uri: 'https://855tech-mobile.s3.ap-east-1.amazonaws.com/content/images/fafa7/avatar/avatar-10.jpg' }}
                            style={styles.avatar}
                        />
                        <Text style={[styles.avatarText]}>Name : icggaming</Text>
                        <Text style={[styles.avatarText]}>Balance : $100</Text>

                    </View>
                </View>

                <DrawerItemList {...props} />

            </DrawerContentScrollView>

            <View style={{
                borderTopColor: "#dde3fe",
                borderTopWidth: 1,
                padding: 20,
                paddingBottom: 20 + bottom
            }}>
                <TouchableOpacity onPress={() => { router.replace('/[lang]/') }}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    avatarTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%', // Centers the avatar and text container vertically in the image
        transform: [{ translateY: -40 }], // Adjusts the container to be centered
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,  // Makes the avatar round
        borderWidth: 2,
        borderColor: '#fff',
        marginBottom: 8, // Adds space between the avatar and the text
    },
    avatarText: {
        fontSize: 16,
        color: '#fff', // Text color for visibility over the image 
    },
});
