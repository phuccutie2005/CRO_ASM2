import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
    header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    addressContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, backgroundColor: 'white' },
    addressText: { fontSize: 16 },
    productContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: 'white', borderRadius: 5, marginBottom: 10 },
    image: { width: 60, height: 60, marginRight: 10 },
    details: { flex: 1 },
    productText: { fontSize: 16, color: '#555' },
    quantity: { fontSize: 14 },
    price: { fontSize: 16, fontWeight: 'bold', color: 'green' },
    paymentOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#272b33', padding: 15, borderRadius: 10, marginBottom: 10 },
    selectedOption: { borderColor: '#ff8c00', borderWidth: 2 },
    optionText: { color: 'white', fontSize: 16, marginLeft: 10, flex: 1 },
    totalText: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
    orderButton: { backgroundColor: '#ff8c00', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
    orderText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    /** ========== STYLE CHO MODAL ========== **/
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)' // Làm tối nền khi mở modal
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5 // Tạo bóng trên Android
    },
    addressItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    phone: {
        fontSize: 14,
        color: 'gray'
    },
    address: {
        fontSize: 14,
        color: '#555'
    },
    defaultLabel: {
        fontSize: 12,
        color: 'green',
        fontWeight: 'bold',
        marginTop: 5
    },
    closeButton: {
        marginTop: 15,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#ff9800',
        borderRadius: 10
    },
    closeText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default styles;
