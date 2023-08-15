import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignUp = ({ navigation }) => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        if (nickname.length < 1 || email.length < 1 || password.length < 1 || confirmPassword.length < 1) {
            Alert.alert('경고', '입력되지 않은 칸이 있습니다! 모두 입력해 주세요!', [{ text: '확인' }]);
        } else if (!isEmailValid(email)) {
            Alert.alert('경고', '이메일 형식이 아닙니다.', [{ text: '확인' }]);
        } else if (password !== confirmPassword) {
            Alert.alert('경고', '비밀번호가 일치하지 않습니다.', [{ text: '확인' }]);
        } else {
            // 가입 처리 로직 실행 및 팝업 표시
            Alert.alert('가입 완료', '정상적으로 가입이 완료되었습니다.', [
                {
                    text: '확인',
                    onPress: () => {
                        navigation.navigate('Login'); // 로그인 화면으로 이동
                    },
                },
            ]);
        }
    };

    // 이메일 형식 검사 함수
    const isEmailValid = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>회원 가입</Text>
            <TextInput
                style={styles.input}
                placeholder="닉네임"
                value={nickname}
                onChangeText={setNickname}
            />
            <TextInput
                style={styles.input}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호 재확인"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>가입하기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2D5E40',
    },
    input: {
        borderWidth: 1,
        borderColor: '#2D5E40',
        padding: 10,
        marginBottom: 10,
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#CBDFC0',
    },
    signUpButton: {
        backgroundColor: '#2D5E40',
        padding: 10,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
    },
    signUpButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SignUp;
