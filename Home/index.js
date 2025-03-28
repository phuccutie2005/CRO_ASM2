import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, FlatList, Image, TouchableOpacity,
    ActivityIndicator, SafeAreaView, Dimensions
} from 'react-native';
import axios from 'axios';
import styles from './styles'; // Import file styles
import SearchBar from './SearchBar'; // Đường dẫn đúng tới file SearchBar.js

const API_URL = 'http://192.168.100.207:5000'; // Đổi thành IP backend của bạn

const banners = [
    { id: 1, image: 'https://intphcm.com/data/upload/banner-thoi-trang-tuoi.jpg' },
    { id: 2, image: 'https://arena.fpt.edu.vn/wp-content/uploads/2022/10/banner-thoi-trang.jpg' },
    { id: 3, image: 'https://arena.fpt.edu.vn/wp-content/uploads/2022/10/banner-thiet-ke-thoi-trang-3-1.jpg' },
    { id: 4, image: 'https://intphcm.com/data/upload/tieu-de-banner-thoi-trang.jpg' },
    { id: 5, image: 'https://wcomvn.s3.ap-southeast-1.amazonaws.com/image/2018/07/02035047/6059cdb6116fd.jpg' },
];

const HomeScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [bannerIndex, setBannerIndex] = useState(0);

    const bannerRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    let bannerInterval = useRef(null);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
        startBannerAutoScroll();

        return () => clearInterval(bannerInterval.current); // Clear interval khi unmount
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query.trim()) return setFilteredProducts(products); // Nếu trống, reset danh sách

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    // Tự động chuyển banner sau 10 giây
    const startBannerAutoScroll = () => {
        bannerInterval.current = setInterval(() => {
            setBannerIndex((prevIndex) => {
                let nextIndex = (prevIndex + 1) % banners.length;
                bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 10000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <>
                        {/* Thanh tìm kiếm */}
                        <SearchBar placeholder="Tìm kiếm sản phẩm..." onChangeText={handleSearch} />

                        {/* Banner quảng cáo */}
                        <FlatList
                            ref={bannerRef}
                            data={banners}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.bannerContainer}>
                                    <Image source={{ uri: item.image }} style={styles.bannerImage} resizeMode="contain" />
                                </View>
                            )}
                        />

                        {/* Danh mục sản phẩm */}
                        <Text style={styles.sectionTitle}>Khám phá danh mục</Text>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoryList}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.categoryItem}>
                                    <Image source={{ uri: item.image }} style={styles.categoryImage} />
                                    <Text style={styles.categoryName}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        {/* Tiêu đề "Sản phẩm nổi bật" */}
                        <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
                    </>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.productItem}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    >
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <View style={styles.priceSoldContainer}>
                            <Text style={styles.productPrice}>{item.price.toLocaleString()} đ</Text>
                            <Text style={styles.productSold}>Đã bán: {Math.floor(Math.random() * 1000)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
