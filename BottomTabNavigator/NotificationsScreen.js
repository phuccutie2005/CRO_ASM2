import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadNotifications();
        }, [])
    );

    const loadNotifications = async () => {
        try {
            const data = JSON.parse(await AsyncStorage.getItem('notifications')) || [];
            setNotifications(data);
        } catch (error) {
            console.error('Lỗi khi tải thông báo:', error);
        }
    };

    return (
        <View style={styles.container}>
            {notifications.length === 0 ? (
                <Text style={styles.noNotifications}>Hiện chưa có thông báo nào</Text>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.notificationItem}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.message}>{item.message}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 15 },
    noNotifications: { textAlign: 'center', fontSize: 16, color: 'gray', marginTop: 20 },
    notificationItem: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
    title: { fontSize: 16, fontWeight: 'bold' },
    message: { fontSize: 14, color: '#555', marginVertical: 5 },
    time: { fontSize: 12, color: 'gray', textAlign: 'right' },
});
