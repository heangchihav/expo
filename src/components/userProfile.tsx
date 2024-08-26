import React, { useState } from 'react';
import {
    StyleSheet,

    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Switch,
    Image,
    Modal,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserProfileProps } from '../types/types';
import { BlurView } from 'expo-blur';


const UserProfile: React.FC<UserProfileProps> = ({ user, onPress, visible }) => {

    const [form, setForm] = useState({
        emailNotifications: true,
        pushNotifications: false,
    });

    return (
        <Modal transparent visible={visible} onRequestClose={onPress} animationType='fade'>
            <BlurView intensity={90} tint={""} style={styles.blurBackground}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContent}>
                        <SafeAreaView style={{ flex: 1, backgroundColor: '', borderRadius: 20, width: "100%", height: "100%" }}>
                            <View style={styles.header}>
                                <View style={styles.headerAction}>
                                    <TouchableOpacity
                                        onPress={onPress}>
                                        <FeatherIcon
                                            color="#000"
                                            name="arrow-left"
                                            size={24} />
                                    </TouchableOpacity>
                                </View>

                                <Text numberOfLines={1} style={styles.headerTitle}>
                                    Settings
                                </Text>

                                <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // handle onPress
                                        }}>
                                        <FeatherIcon
                                            color="#000"
                                            name="more-vertical"
                                            size={24} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <ScrollView contentContainerStyle={styles.content}>
                                <View style={[styles.section, { paddingTop: 4 }]}>
                                    <Text style={styles.sectionTitle}>Account</Text>

                                    <View style={styles.sectionBody}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // handle onPress
                                            }}
                                            style={styles.profile}>
                                            <Image
                                                alt=""
                                                source={{
                                                    uri: user.avatarUri,
                                                }}
                                                style={styles.profileAvatar} />

                                            <View style={styles.profileBody}>
                                                <Text style={styles.profileName}>{user.name}</Text>

                                                <Text style={styles.profileHandle}>{user.email}</Text>
                                            </View>

                                            <FeatherIcon
                                                color="#bcbcbc"
                                                name="chevron-right"
                                                size={22} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Preferences</Text>

                                    <View style={styles.sectionBody}>
                                        <View style={[styles.rowWrapper, styles.rowFirst]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // handle onPress
                                                }}
                                                style={styles.row}>
                                                <Text style={styles.rowLabel}>Language</Text>

                                                <View style={styles.rowSpacer} />

                                                <Text style={styles.rowValue}>English</Text>

                                                <FeatherIcon
                                                    color="#bcbcbc"
                                                    name="chevron-right"
                                                    size={19} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.rowWrapper}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // handle onPress
                                                }}
                                                style={styles.row}>
                                                <Text style={styles.rowLabel}>Location</Text>

                                                <View style={styles.rowSpacer} />

                                                <Text style={styles.rowValue}>Los Angeles, CA</Text>

                                                <FeatherIcon
                                                    color="#bcbcbc"
                                                    name="chevron-right"
                                                    size={19} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.rowWrapper}>
                                            <View style={styles.row}>
                                                <Text style={styles.rowLabel}>Email Notifications</Text>

                                                <View style={styles.rowSpacer} />

                                                <Switch
                                                    onValueChange={emailNotifications =>
                                                        setForm({ ...form, emailNotifications })
                                                    }
                                                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                                                    value={form.emailNotifications} />
                                            </View>
                                        </View>

                                        <View style={[styles.rowWrapper, styles.rowLast]}>
                                            <View style={styles.row}>
                                                <Text style={styles.rowLabel}>Push Notifications</Text>

                                                <View style={styles.rowSpacer} />

                                                <Switch
                                                    onValueChange={pushNotifications =>
                                                        setForm({ ...form, pushNotifications })
                                                    }
                                                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                                                    value={form.pushNotifications} />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Resources</Text>

                                    <View style={styles.sectionBody}>
                                        <View style={[styles.rowWrapper, styles.rowFirst]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // handle onPress
                                                }}
                                                style={styles.row}>
                                                <Text style={styles.rowLabel}>Contact Us</Text>

                                                <View style={styles.rowSpacer} />

                                                <FeatherIcon
                                                    color="#bcbcbc"
                                                    name="chevron-right"
                                                    size={19} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.rowWrapper}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // handle onPress
                                                }}
                                                style={styles.row}>
                                                <Text style={styles.rowLabel}>Report Bug</Text>

                                                <View style={styles.rowSpacer} />

                                                <FeatherIcon
                                                    color="#bcbcbc"
                                                    name="chevron-right"
                                                    size={19} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.rowWrapper}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // handle onPress
                                                }}
                                                style={styles.row}>
                                                <Text style={styles.rowLabel}>Rate in App Store</Text>

                                                <View style={styles.rowSpacer} />

                                                <FeatherIcon
                                                    color="#bcbcbc"
                                                    name="chevron-right"
                                                    size={19} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[styles.rowWrapper, styles.rowLast]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // handle onPress
                                                }}
                                                style={styles.row}>
                                                <Text style={styles.rowLabel}>Terms and Privacy</Text>

                                                <View style={styles.rowSpacer} />

                                                <FeatherIcon
                                                    color="#bcbcbc"
                                                    name="chevron-right"
                                                    size={19} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.section}>
                                    <View style={styles.sectionBody}>
                                        <View
                                            style={[
                                                styles.rowWrapper,
                                                styles.rowFirst,
                                                styles.rowLast,
                                                { alignItems: 'center' },
                                            ]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // handle onPress
                                                }}
                                                style={styles.row}>
                                                <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                                                    Log Out
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.contentFooter}>App Version 2.24 #50491</Text>
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
}
export default UserProfile
const styles = StyleSheet.create({
    blurBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    modalContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Glassmorphism effect
        borderRadius: 20,
        width: '90%', // Adjust width based on screen size
        maxWidth: 600, // Maximum width for larger screens
        height: '90%', // Adjust height
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    /** Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
    },
    headerAction: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: '600',
        color: '#000',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: 'center',
    },
    /** Content */
    content: {
        paddingHorizontal: 16,
    },
    contentFooter: {
        marginTop: 24,
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        color: '#a69f9f',
    },
    /** Section */
    section: {
        paddingVertical: 12,
    },
    sectionTitle: {
        margin: 8,
        marginLeft: 12,
        fontSize: 13,
        letterSpacing: 0.33,
        fontWeight: '500',
        color: '#a69f9f',
        textTransform: 'uppercase',
    },
    sectionBody: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    /** Profile */
    profile: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
        marginRight: 12,
    },
    profileBody: {
        marginRight: 'auto',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#292929',
    },
    profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: '400',
        color: '#858585',
    },
    /** Row */
    row: {
        height: 44,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 12,
    },
    rowWrapper: {
        paddingLeft: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#f0f0f0',
    },
    rowFirst: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    rowLabel: {
        fontSize: 16,
        letterSpacing: 0.24,
        color: '#000',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    rowValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ababab',
        marginRight: 4,
    },
    rowLast: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    rowLabelLogout: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '600',
        color: '#dc2626',
    },

});