import React, { useContext, useEffect, useState, useRef } from 'react';
import { Modal, View, Text, StyleSheet, Animated, Dimensions, ImageBackground, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ThemeContext } from '@/src/contexts/ThemeContext';
import { BlurView } from 'expo-blur';
import AvatarModal from './AvatarModal';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

const SlideInModal = ({ visible, closeModal }: { visible: boolean; closeModal: () => void }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const [showModal, setShowModal] = useState(visible);
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else { 
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    }
  }, [visible]);

  const menuItems = [
    { id: '1', title: 'Sport' },
    { id: '2', title: 'Live Casino' },
    { id: '3', title: 'Slots' },
    { id: '4', title: 'Fishing Games' },
    { id: '5', title: 'Number' },
    { id: '6', title: 'Poker' },
    { id: '7', title: 'Lottery' },
    { id: '8', title: 'Cockfight' },
    { id: '9', title: 'Promotion' },
  ];

  const modalBackgroundImage = isDarkMode
    ? 'https://img.freepik.com/premium-photo/vibrant-blue-poker-table-background-sets-stage-exciting-gameplay_1000124-99940.jpg'
    : 'https://img.freepik.com/premium-photo/lucky-love-closeup-view-red-casino-dice-ultimate-gamblers_983420-240197.jpg';

  const headerImage = isDarkMode
    ? 'https://res.cloudinary.com/da8ox9rlr/image/upload/v1724657760/icg/Snipaste_2024-08-26_02-35-23_dut26h.png'
    : 'https://thumbs.dreamstime.com/b/horizontal-red-casino-background-your-pad-your-screen-55173136.jpg';

  const menuItemBackground = isDarkMode
    ? 'https://static.vecteezy.com/system/resources/previews/035/973/649/large_2x/ai-generated-casino-theme-playing-cards-chips-and-golden-coins-on-black-background-concept-of-casino-game-poker-card-playing-gambling-chips-in-a-black-and-gold-style-banner-backdrop-background-free-photo.jpg'
    : 'https://img.freepik.com/free-psd/realistic-casino-items-illustration_23-2150688787.jpg';

  return (
    <Modal transparent visible={showModal} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.overlay} />
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
              <ImageBackground
                source={{ uri: modalBackgroundImage }}
                style={styles.modalBackgroundImage}
                resizeMode="cover"
              >
                <View style={styles.contentWrapper}>
                  <View style={styles.headerSection}>
                    <Image
                      source={{ uri: headerImage }}
                      style={styles.headerImage}
                      resizeMode="cover"
                    />
                    <AvatarModal />
                  </View>

                  <View style={styles.dividerLine} />
                  {/* Menu Section with Glass Effect */}
                  <BlurView
                    style={styles.glassEffect}
                    intensity={isDarkMode ? 70 : 50}
                    tint={isDarkMode ? 'dark' : 'light'}
                  >
                    <ScrollView style={styles.menuSection}>
                      {menuItems.map((item) => (
                        <TouchableOpacity key={item.id} onPress={closeModal} style={styles.menuItemContainer}>
                          <ImageBackground
                            source={{ uri: menuItemBackground }}
                            style={styles.menuItemBackground}
                            resizeMode="cover"
                          >
                            <Svg height="40" width="100%" style={styles.gradientText}>
                              <Defs>
                                <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <Stop offset="0%" stopColor="#FF6F00" />
                                  <Stop offset="100%" stopColor="#FFAB00" />
                                </LinearGradient>
                              </Defs>
                              <SvgText
                                x="50%"
                                y="50%"
                                fontSize="18"
                                fill="url(#grad)"
                                textAnchor="middle"
                                dy=".3em"
                                fontWeight="bold"
                              >
                                {item.title}
                              </SvgText>
                            </Svg>
                          </ImageBackground>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </BlurView>
                </View>

                {/* Close Button */}
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </ImageBackground>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-start', // Aligns modal to slide in from the left
    alignItems: 'flex-start', // Align modal from the left
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  modalContainer: {
    width: '80%',
    maxWidth: 400,
    height: '100%',
    backgroundColor: 'transparent',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    position: 'absolute',
    left: 0, // Align the modal on the left side
    borderTopRightRadius: 30, // Rounded corner on the right
    borderBottomRightRadius: 30, // Rounded corner on the right
    overflow: 'hidden',
  },
  modalBackgroundImage: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  headerSection: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    marginTop: 30
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerLine: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 10,
    marginHorizontal: 30,
  },
  glassEffect: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menuSection: {
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  menuItemContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuItemBackground: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SlideInModal;
