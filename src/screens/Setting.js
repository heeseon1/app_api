import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomButton = ({ title, screenName, userToken }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(screenName, { userToken });
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>{title}</Text>
            <Icon name="arrow-right" size={40} color="#E5EFDF" style={styles.icon} />
        </TouchableOpacity>
    );
};

const OtherScreen = () => {
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('authToken');
                if (accessToken !== null) {
                    setUserToken(accessToken); // 토큰 값을 상태에 설정
                } else {
                    console.error('authToken이 없음!!');
                }
            } catch (error) {
                console.error('토큰 에러 : ', error);
            }
        };
        getToken();
    }, []);

    
    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <CustomButton title="계정 확인" screenName="Mypage" token={userToken}/>
                <CustomButton title="환경설정" screenName="Configuration" />
                <CustomButton title="공지사항" screenName="Notice" />
                <CustomButton title="문의하기" screenName="Inquiry" />
                <CustomButton title="이용방법" screenName="UseGuide" />
                <CustomButton title="이용약관" screenName="TermsOfUse" />
                <CustomButton title="개인정보활용방침" screenName="PrivacyPolicy" />
                <CustomButton title="소프트웨어 라이선스" screenName="SoftwareLicense" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2D5E40',
    },
    buttonsContainer: {
        alignSelf: 'flex-start',
        width: 400,
    },
    button: {
        padding: 10,
        backgroundColor: '#2D5E40',
        width: '100%',
        borderColor: '#E5EFDF',
        borderBottomWidth: 1,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#E5EFDF',
        fontSize: 20,
    },
    icon: {
        marginLeft: 'auto', // 화살표 아이콘을 우측으로 이동
        left: -40,
    },
});

export default OtherScreen;
