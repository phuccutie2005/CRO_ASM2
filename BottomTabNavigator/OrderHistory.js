import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;

const orders = [
    { id: '1', name: 'Đơn hàng #001', total: '500,000 VND' },
    { id: '2', name: 'Đơn hàng #002', total: '1,200,000 VND' },
    { id: '3', name: 'Đơn hàng #003', total: '750,000 VND' },
];

const OrderList = ({ status }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.orderItem}>
                        <Text style={styles.orderName}>{item.name}</Text>
                        <Text style={styles.orderTotal}>{item.total}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const OrderHistory = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#fff' },
                tabBarIndicatorStyle: { backgroundColor: '#ff9800' },
            }}
        >
            <Tab.Screen name="Đang xử lý" children={() => <OrderList status="processing" />} />
            <Tab.Screen name="Đã giao" children={() => <OrderList status="delivered" />} />
            <Tab.Screen name="Đã hủy" children={() => <OrderList status="canceled" />} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
    orderItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    orderName: { fontSize: 16, fontWeight: 'bold' },
    orderTotal: { fontSize: 14, color: '#888', marginTop: 5 },
});

export default OrderHistory;
