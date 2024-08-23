import React, { useContext, useEffect, useState } from 'react';
import { Modal, View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, withTiming, interpolate, Extrapolation } from 'react-native-reanimated';
import { ThemeContext } from '@/src/contexts/ThemeContext';

const SlideInModal = ({ visible, closeModal }: { visible: boolean; closeModal: () => void }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const screenWidth = Dimensions.get('window').width;

  const translateX = useSharedValue(-screenWidth);
  const imageScale = useSharedValue(0.8);
  const avatarScale = useSharedValue(0.8);
  const fadeAnim = useSharedValue(1);
  const scrollY = useSharedValue(0);

  // Correctly defining showModal and setShowModal as local state
  const [showModal, setShowModal] = useState(false);
  const AVATAR_POSITION = 30; // Adjust this to the avatar's y-position

  // Effect to handle visibility changes
  useEffect(() => {
    if (visible) {
      setShowModal(true); // Show modal on visibility change
      translateX.value = withTiming(0, { duration: 200 });
      imageScale.value = withTiming(1, { duration: 300 });
      avatarScale.value = withTiming(1, { duration: 300 });
      fadeAnim.value = withTiming(1, { duration: 500 });
      scrollY.value = 0; // Reset scroll position when modal opens
    } else {
      translateX.value = withTiming(-screenWidth, { duration: 200 });
      imageScale.value = withTiming(0.8, { duration: 200 });
      avatarScale.value = withTiming(0.8, { duration: 200 });
      fadeAnim.value = withTiming(0, { duration: 100 }, () => {
        setShowModal(false); // Hide modal after closing animation finishes
      });
    }
  }, [visible]);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const animatedAvatarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }],
  }));

  const animatedOpacityStyle = (index: number) =>
    useAnimatedStyle(() => {
      const opacity = interpolate(
        scrollY.value, // Scroll position
        [AVATAR_POSITION + index * 70, AVATAR_POSITION + index * 70 + 50], // Scroll range
        [1, 0.1], // Opacity range from 1 (fully visible) to 0 (fully transparent)
        Extrapolation.CLAMP
      );

      return {
        opacity: opacity, // Apply the calculated opacity
      };
    });
  return (
    <Modal
      transparent
      visible={showModal} // Control modal visibility through local state
      animationType="none"
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.overlay} />
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContainer, animatedContainerStyle]}>
              <Animated.Image
                source={{ uri: 'https://res.cloudinary.com/da8ox9rlr/image/upload/v1724299578/icg/login_esxhtr.jpg' }}
                style={[styles.backgroundImage, animatedImageStyle]}
                resizeMode="cover"
              />

              {/* Avatar Positioned Overlapping the Background Image */}
              <Animated.View style={[styles.avatarContainer, animatedAvatarStyle]}>
                <Image
                  source={{ uri: 'https://855tech-mobile.s3.ap-east-1.amazonaws.com/content/images/fafa7/avatar/avatar-10.jpg' }}
                  style={styles.avatar}
                />
                <Text style={styles.avatarText}>Name: icggaming</Text>
                <Text style={styles.avatarText}>Balance: $100</Text>
              </Animated.View>

              <Animated.ScrollView
                contentContainerStyle={styles.scrollViewContent}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
              >
                <View style={styles.menuContainer}>
                  {['Sport', 'Live Casino', 'Slots', 'Fishing Games', 'Number', 'Poker', 'Lottery', 'Cockfight', 'Promotion'].map((item, index) => (
                    <Animated.View
                      key={index}
                      style={[styles.menuItemContainer, animatedOpacityStyle(index)]}
                    >
                      <TouchableOpacity onPress={closeModal} style={styles.menuItemContainer}>
                        <Text style={styles.menuItem}>{item}</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </View>
              </Animated.ScrollView>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  modalContainer: {
    width: '80%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  backgroundImage: {
    width: '100%',
    height: 100,
  },
  avatarContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 8,
  },
  scrollViewContent: {
    marginTop: 100,
    paddingBottom: 20,
  },
  menuContainer: {
    paddingTop: 20,
  },
  menuItemContainer: {
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#0091ff',
    borderRadius: 10,
  },
  menuItem: {
    fontSize: 18,
    color: 'black',
  },
  closeButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default SlideInModal;
