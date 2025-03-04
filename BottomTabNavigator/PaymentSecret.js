import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import styles from './stylePaymentSecret';

const PaymentSecret = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const itemsRef = useRef(route.params?.items || []);
    const totalPriceRef = useRef(route.params?.totalPrice || 0);

    const [items, setItems] = useState(itemsRef.current);
    const [totalPrice, setTotalPrice] = useState(totalPriceRef.current);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [receiverInfo, setReceiverInfo] = useState(route.params?.selectedAddress || null);
    const [modalVisible, setModalVisible] = useState(false);

    const addresses = [
        { id: '1', name: 'Trần Văn Phúc', phone: '(+84) 376 953 693', address: 'Số 111, Hồ Quý Ly, Phường Hòa Minh, Quận Liên Chiểu, Đà Nẵng', isDefault: true },
        { id: '2', name: 'Trần Văn Phúc', phone: '(+84) 376 953 693', address: 'Dốc Động, Thôn Hà Thanh, Xã Đại Đồng, Huyện Đại Lộc, Quảng Nam', isDefault: false },
    ];

    const paymentMethods = [
        { id: 'wallet', name: 'Wallet', icon: 'wallet-outline' },
        { id: 'google', name: 'Google Pay', icon: 'logo-google' },
        { id: 'apple', name: 'Apple Pay', icon: 'logo-apple' },
        { id: 'amazon', name: 'Amazon Pay', icon: 'logo-amazon' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thông tin người nhận</Text>
            <TouchableOpacity
                style={styles.addressContainer}
                onPress={() => setModalVisible(true)} // Mở modal thay vì điều hướng
            >
                <Text style={styles.addressText}>
                    {receiverInfo ? `${receiverInfo.name}, ${receiverInfo.phone}, ${receiverInfo.address}` : 'Chọn địa chỉ giao hàng'}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
            </TouchableOpacity>

            {/* Modal chọn địa chỉ */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.header}>Chọn địa chỉ giao hàng</Text>
                        <FlatList
                            data={addresses}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.addressItem}
                                    onPress={() => {
                                        setReceiverInfo(item);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.name}>{item.name} <Text style={styles.phone}>{item.phone}</Text></Text>
                                    <Text style={styles.address}>{item.address}</Text>
                                    {item.isDefault && <Text style={styles.defaultLabel}>Mặc định</Text>}
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Text style={styles.header}>Sản phẩm</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.productText}>{item.name}</Text>
                            <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                            <Text style={styles.price}>{(item.price * item.quantity).toLocaleString('vi-VN')} VND</Text>
                        </View>
                    </View>
                )}
            />

            <Text style={styles.header}>Phương thức thanh toán</Text>
            <FlatList
                data={paymentMethods}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.paymentOption, selectedMethod === item.id && styles.selectedOption]}
                        onPress={() => setSelectedMethod(item.id)}
                    >
                        <Ionicons name={item.icon} size={24} color="white" />
                        <Text style={styles.optionText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            <Text style={styles.totalText}>Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VND</Text>

            <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderText}>Đặt hàng</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PaymentSecret;
