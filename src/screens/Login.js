import React, { useState, useEffect } from 'react';
import {
    View,Text,
    StyleSheet,Image,
    TouchableOpacity,
    FlatList,
    Alert,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import versionCheck from 'react-native-version-check'; // 추가: react-native-version-check 라이브러리를 임포트
import DjangoIP from '../components/SetIP';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [currentVersion, setCurrentVersion] = useState('vol 0.0.93'); // 추가: 현재 앱 버전 상태 추가

    useEffect(() => {
        const getToken = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('authToken');
                if (accessToken !== null) {
                    console.log('토큰을 성공적으로 가져왔습니다:', accessToken);
                    setToken(accessToken);
            
                } else {
                    console.error('authToken이 없음!!');
                }
            } catch (error) {
                console.error('토큰 에러 : ', error);
            }
        };
        getToken();

    }, []);

    const isEmailValid = email => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };

    const isLoginEnabled = () => {
        return email.length > 0 && password.length > 0 && isEmailValid(email);
    };

    const handleTermsScreen = () => {
        navigation.navigate('TermsScreen');
    };


    const handleLogin = async () => {
        if (!email) {
            Alert.alert('이메일 입력', '이메일을 입력해주세요', [{ text: '확인' }]);
            return;
        }
    
        // 이메일 형식이 올바르지 않을 때 팝업 표시
        if (!isEmailValid(email)) {
            Alert.alert('이메일 형식 오류', '이메일 형식이 올바르지 않습니다', [{ text: '확인' }]);
            return;
        }
    
        // 비밀번호 입력이 없을 때 팝업 표시
        if (!password) {
            Alert.alert('비밀번호 입력', '비밀번호를 입력해주세요', [{ text: '확인' }]);
            return;
        }
    

        try {
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            });
        
            const djServer = await fetch(`${DjangoIP}/accounts/dj-rest-auth/login/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                email,
                password,
                }),
            });
        
            // 서버 응답을 기다림
            if (djServer.status === 200) {
                // 로그인 성공 시 처리
                const responseData = await djServer.json();
                const accessToken = responseData.access;
                const pk = responseData.user.pk;
                const email = responseData.user.email;
        
                if (accessToken) {
                await AsyncStorage.setItem('authToken', accessToken); // AsyncStorage에 저장
                navigation.navigate('Home', { token: accessToken, pk, email });
                } else {
                console.error('토큰이 정의되지 않았습니다.');
                }
            } else if (djServer.status === 400) {
                // 비밀번호가 일치하지 않을 때 팝업 표시
                Alert.alert('로그인 실패', '비밀번호가 일치하지 않습니다', [{ text: '확인' }]);
            } else {
                // 서버 응답 실패 또는 네트워크 오류 처리
                const errorMessage = '서버와 연동되지 않았습니다. 네트워크 상태를 확인해주세요.';
                Alert.alert('로그인 실패', errorMessage, [{ text: '확인' }]);
                console.error('API 요청 실패');
            }
            } catch (error) {
            // 네트워크 오류 처리
            const errorMessage = '네트워크 오류가 발생했습니다. 네트워크 연결을 확인하세요.';
            Alert.alert('로그인 실패', errorMessage, [{ text: '확인' }]);
            console.error('API 요청 실패:', error);
            }
        };
        

    const handlePW_findScreen = () => {
        navigation.navigate('Pw_find');
    };

    const data = [
        { key: 'SignUp', title: '회원 가입', onPress: handleTermsScreen },
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
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                title={'비밀번호'}
                style={styles.input}
                placeholder="pw"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
                style={styles.mainButton}
                onPress={handleLogin}
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
            <View>
            <Text style={styles.text}>현재 버전: {currentVersion}</Text>
            </View>
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


export default LoginScreen;