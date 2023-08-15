import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Pw_find = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const isEmailValid = email => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };

    const handleSendResetEmail = () => {
        if (isEmailValid(email)) {
            setIsEmailSent(true);
        } else {
            Alert.alert('경고', '이메일 주소를 확인해주세요.', [{ text: '확인' }]);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/main.png')}
                style={[styles.image, { opacity: 0.5 }]}
            ></Image>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={30} color="#2D5E40" />
            </TouchableOpacity>
            <Text style={styles.baseText}>GreenDan</Text>
            {!isEmailSent ? (
                <>
                    <TextInput
                        title={'이메일'}
                        style={styles.input}
                        placeholder="your@mail.com"
                        keyboardType={KeyboardTypes.EMAIL}
                        returnKeyType={ReturnKeyTypes.GO}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />

                    <TouchableOpacity onPress={handleSendResetEmail}>
                        <Text style={styles.textButton}>
                            비밀번호 찾기
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.text}>
                    이메일이 전송되었습니다. 이메일을 확인하여 비밀번호 재설정을 완료하세요.
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginVertical: 150,
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
    },
    baseText: {
        flex: 1,
        fontSize: 30,
        color: '#8CB972',
        fontWeight: 'bold',
        margin: 20,
    },
    text: {
        fontSize: 20,
    },
    image: {
        borderRadius: 1,
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 10,
        borderColor: '#2D5E40',
        borderWidth: 1,
        paddingHorizontal: 80,
        paddingVertical: 7,
        margin: 10,
        backgroundColor: '#2D5E40',
        color: '#E5EFDF',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#E5EFDF',
        color: '#538454',
        borderColor: '#2D5E40',
    },
    backButton: {
        position: 'absolute',
        top: -100,
        left: 280,
        padding: 10,
    },
});

export default Pw_find;
