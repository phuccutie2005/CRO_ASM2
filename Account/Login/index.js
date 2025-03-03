import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Tài khoản test
    const testAccounts = [
        { email: 'testuser1@gmail.com', password: '123456' },
        { email: 'pakdeku@ohyes.com', password: 'admin123' },
    ];

    useEffect(() => {
        loadCredentials();
    }, []);

    const loadCredentials = async () => {
        try {
            const savedEmail = await AsyncStorage.getItem('email');
            const savedPassword = await AsyncStorage.getItem('password');
            if (savedEmail && savedPassword) {
                setEmail(savedEmail);
                setPassword(savedPassword);
                setRememberMe(true);
            }
        } catch (error) {
            console.log('Error loading credentials', error);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        try {
            const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (!foundUser) {
                setError('Incorrect email or password');
                return;
            }

            if (rememberMe) {
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('password', password);
            } else {
                await AsyncStorage.removeItem('email');
                await AsyncStorage.removeItem('password');
            }

            // 🔹 Lưu username để hiển thị trên SettingsScreen
            await AsyncStorage.setItem('username', foundUser.username || 'User');

            // Chuyển hướng đến Home
            navigation.navigate('Home');
        } catch (error) {
            console.log('Error logging in', error);
        }
    };


    return (
        <ImageBackground
            source={require('../../assets/background1.jpg')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to NabuShop !!</Text>
                <Text style={styles.subtitle}>Login to Continue</Text>

                {/* Ô nhập Email */}
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Email Address'
                        placeholderTextColor='#aaa'
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Ô nhập Password + Icon mắt */}
                <View style={[styles.inputContainer, error ? styles.errorBorder : null]}>
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor='#aaa'
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#aaa"
                        />
                    </TouchableOpacity>
                </View>

                {/* Hiển thị lỗi */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Nút Remember Me */}
                <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                    <Text style={{ color: rememberMe ? 'orange' : '#fff' }}>
                        {rememberMe ? '☑' : '☐'} Remember Me
                    </Text>
                </TouchableOpacity>

                {/* Nút Sign In */}
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Nút Sign in with Google */}
                <TouchableOpacity style={styles.googleButton}>
                    <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>

                {/* Liên kết Register và Reset Password */}
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkHighlight}>Register</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={styles.linkText}>Forgot Password? <Text style={styles.linkHighlight}>Click Reset</Text></Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;
