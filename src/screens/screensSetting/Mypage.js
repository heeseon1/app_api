import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const Mypage = () => {
    const navigation = useNavigation();
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    const data = [
        {
            id: '1',
            title: '프로필 설정',
            screen: 'Myprofile',
        },
        {
            id: '2',
            title: '비밀번호 재설정',
            screen: 'Pw_reset',
        },
    ];

    const handleNavigation = (screen) => {
        navigation.navigate(screen);
    };

    const handleLogout = () => {
        setLogoutModalVisible(true);
    };

    const handleConfirmLogout = () => {
        setLogoutModalVisible(false);
        navigation.navigate('Login');
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigation(item.screen)}
        >
            <Text style={styles.buttonText}>{item.title}</Text>
            <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.appName}>GreenDan</Text>

            <Image source={require('../../../assets/profile_tomato.jpg')} style={styles.profileImage} />
            <Text style={styles.welcomeText}>환영합니다!</Text>
            <Text style={styles.nickname}>사용자 닉네임</Text>
            
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.buttonList}
            />

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutButtonText}>로그아웃</Text>
            </TouchableOpacity>

            <Modal isVisible={isLogoutModalVisible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>로그아웃 하시겠습니까?</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleConfirmLogout}>
                            <Text style={styles.modalButtonText}>확인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setLogoutModalVisible(false)}>
                            <Text style={styles.modalButtonText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
    },
    appName: {
        fontSize: 40,
        color: '#CBDFC0',
        marginTop: 40,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 20,
    },
    welcomeText: {
        fontSize: 30,
        color: '#CBDFC0',
    },
    nickname: {
        fontSize: 18,
        color: '#2D5E40',
        marginBottom: 20,
    },
    buttonList: {
        margin: 10,
        width: '70%',
    },
    buttonContainer: {
        backgroundColor: '#2D5E40',
        paddingTop: 20,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#CBDFC0',
    },
    logoutButton: {
        backgroundColor: '#CBDFC0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#2D5E40',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        color: 'gray',
    },
    modalButtons: {
        flexDirection: 'row',
    },
    modalButton: {
        backgroundColor: '#2D5E40',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    modalButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Mypage;
