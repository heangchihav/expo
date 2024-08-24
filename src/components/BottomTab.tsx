import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const BottomTab = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tabItem}>
                <Text style={styles.tabText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Text style={styles.tabText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Text style={styles.tabText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Text style={styles.tabText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BottomTab;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 40,
        margin:10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 14,
        color: '#333',
    },
});
