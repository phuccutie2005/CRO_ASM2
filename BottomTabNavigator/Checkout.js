import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen = ({ route }) => {
    const navigation = useNavigation();
    const { cartItems = [], totalPrice = 0, product } = route.params || {};

    // Nếu có sản phẩm mua ngay, thêm nó vào danh sách cartItems
    const combinedItems = product ? [...cartItems, { ...product, quantity: 1 }] : cartItems;

    // Tính tổng tiền nếu có sản phẩm mua ngay
    const finalTotalPrice = product ? totalPrice + product.price : totalPrice;

    console.log("Dữ liệu nhận được từ CartScreen hoặc DetailScreen:", route.params);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Xác nhận đơn hàng</Text>

            <FlatList
                data={combinedItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                            <Text style={styles.price}>{(item.price * item.quantity).toLocaleString('vi-VN')} VND</Text>
                        </View>
                    </View>
                )}
            />

            <Text style={styles.total}>Tổng tiền: {finalTotalPrice.toLocaleString('vi-VN')} VND</Text>

            <TouchableOpacity style={styles.orderButton} onPress={() => alert('Đặt hàng thành công!')}>
                <Text style={styles.buttonText}>Xác nhận đặt hàng</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: 'white' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    productContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    image: { width: 60, height: 60, marginRight: 10 },
    details: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold' },
    quantity: { fontSize: 14 },
    price: { fontSize: 16, fontWeight: 'bold', color: 'green' },
    total: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginVertical: 10 },
    orderButton: { backgroundColor: 'green', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});

export default CheckoutScreen;
