import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    TextInput,
} from 'react-native';
import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isEmailValid = email => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };

    const isLoginEnabled = () => {
        return email.length > 0 && password.length > 0 && isEmailValid(email);
    };

    const hanndleTermsScreen = () => {
        navigation.navigate('TermsScreen');
    };

    // ... (이전 코드)

    const handleMainScreen = () => {
        if (!isLoginEnabled()) {
            if (email.length === 0 || password.length === 0) {
                Alert.alert('로그인 실패', '아이디와 비밀번호를 모두 입력해주세요.', [{ text: '확인' }]);
            } else if (!isEmailValid(email)) {
                Alert.alert('로그인 실패', '올바른 이메일 형식이 아닙니다. 다시 확인해주세요.', [{ text: '확인' }]);
            }
        } else {
            // Simulate a successful login
            Alert.alert('로그인 성공', '로그인에 성공했습니다.', [{ text: '확인' }]);
            navigation.navigate('Home');
        }
    };

// ... (나머지 코드)


    const handlePW_findScreen = () => {
        navigation.navigate('Pw_find');
    };

    const data = [
        { key: 'SignUp', title: '회원 가입', onPress: hanndleTermsScreen },
        { key: 'PwFind', title: '비밀번호 찾기', onPress: handlePW_findScreen },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.button}
            onPress={item.onPress}
        >
            <Text style={styles.textButton}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/main.png')} style={styles.image} />
            <Text style={styles.baseText}>GreenDan</Text>
            <TextInput
                title={'이메일'}
                style={styles.input}
                placeholder="your@mail.com"
                keyboardType={KeyboardTypes.EMAIL}
                returnKeyType={ReturnKeyTypes.NEXT}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                title={'비밀번호'}
                style={styles.input}
                placeholder="pw"
                returnKeyType={ReturnKeyTypes.DONE}
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
                style={styles.mainButton}
                onPress={handleMainScreen}
                
            >
                <Text style={styles.mainButtonText}>Login</Text>
            </TouchableOpacity>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                contentContainerStyle={styles.buttonContainer}
            />
            <Text style={styles.text}>vol.0.9</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    baseText: {
        fontSize: 40,
        color: '#8CB972',
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: 'white',
    },
    mainButton: {
        fontSize: 20,
        borderRadius: 10,
        paddingHorizontal: 130,
        paddingVertical: 5,
        margin: 5,
        backgroundColor: '#2D5E40',
        borderColor: '#2D5E40',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainButtonText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    textButton: {
        fontSize: 20,
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 1,
        marginLeft: 20,
        marginBottom: 150,
    },
    button: {
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        color: '#2D5E40',
    },
    image: {
        marginBottom: 20,
    },
    text: {
        marginTop: 10,
        fontSize: 14,
        color: '#2D5E40',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        width: '80%',
        borderRadius: 5,
        backgroundColor: '#E5EFDF',
        color: '#538454',
    },
});

export default Login;
