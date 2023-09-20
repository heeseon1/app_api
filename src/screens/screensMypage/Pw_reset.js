import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import DjangoIP from '../../components/SetIP';

const Pw_reset = ({ navigation, route }) => {
    const [basepassword, setPassword] = useState('');
    const [new_password1, setNewPassword1] = useState('');
    const [new_password2, setNewPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { token } = route.params;

    const handleResetPassword = async () => {
        try {
            setErrorMessage(''); // 초기화
            
            if (!basepassword || !new_password1 || !new_password2) {
                Alert.alert('입력 필요', '입력되지 않은 칸이 있습니다! 모두 입력해주세요!');
                return;
            }
            if (!basepassword) {
                Alert.alert('비밀번호 변경 실패', '기존 비밀번호를 입력하세요.');
                return;
            }

            if (new_password1 === basepassword) {
                Alert.alert('비밀번호 변경 실패', '현재 비밀번호와 새 비밀번호는 같을 수 없습니다.');
                return;
            }

            if (new_password1 !== new_password2) {
                Alert.alert('재설정 비밀번호 불일치', '재설정 비밀번호가 일치하지 않습니다.');
                return;
            }

            const djServer = await fetch(`${DjangoIP}/accounts/dj-rest-auth/password/change/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    new_password1: new_password1,
                    new_password2: new_password2,
                }),
            });

            if (djServer.status === 200) {
                Alert.alert('비밀번호 변경 완료', '비밀번호가 변경되었습니다.', [
                    {
                        text: '확인',
                        onPress: () => navigation.goBack(),
                    },
                ]);
            } else {
                Alert.alert('비밀번호 변경 실패', '비밀번호 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('비밀번호 변경 중 오류 발생:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/main.png')} style={styles.logo} />
            <Text style={styles.appName}>GreenDan</Text>
            <TextInput
                style={styles.input}
                placeholder="기존 비밀번호"
                secureTextEntry={true}
                value={basepassword}
                onChangeText={text => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="새 비밀번호"
                secureTextEntry={true}
                value={new_password1}
                onChangeText={text => setNewPassword1(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                secureTextEntry={true}
                value={new_password2}
                onChangeText={text => setNewPassword2(text)}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetPassword}
            >
                <Text style={styles.resetButtonText}>비밀번호 재설정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 10,
        opacity: 0.6,
    },
    appName: {
        fontSize: 40,
        marginBottom: 20,
        color: '#8CB972',
        fontWeight: 'bold',
    },
    input: {
        width: 250,
        borderWidth: 1,
        borderColor: '#2D5E40',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#E5EFDF',
    },
    resetButton: {
        width: 250,
        backgroundColor: '#2D5E40',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        margin: 30,
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Pw_reset;