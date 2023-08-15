import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Pw_reset = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = () => {
        if (newPassword === confirmPassword) {
            // 비밀번호 재설정 로직을 여기에 추가하세요
            Alert.alert(
                '비밀번호 변경 완료',
                '비밀번호가 변경되었습니다.',
                [
                    {
                        text: '확인',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } else {
            Alert.alert('비밀번호 확인', '입력한 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/main.png')} style={styles.logo} />
            <Text style={styles.appName}>GreenDan</Text>
            <TextInput
                style={styles.input}
                placeholder="새 비밀번호"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity
                style={[styles.resetButton, { backgroundColor: newPassword === confirmPassword && newPassword !== '' ? 'blue' : 'gray' }]}
                onPress={handleResetPassword}
                disabled={newPassword !== confirmPassword || newPassword === ''}
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
        opacity: 0.6, // 로고 이미지에 투명도 추가
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
        marginBottom: 15,
        backgroundColor: '#E5EFDF',
    },
    resetButton: {
        width: 250,
        backgroundColor: 'blue',
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
});

export default Pw_reset;
