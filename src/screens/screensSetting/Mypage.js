import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Mypage = () => {
    const navigation = useNavigation();
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [pushNotificationEnabled, setPushNotificationEnabled] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('');

    const route = useRoute();
    const { token, pk } = route.params;
    console.log('사용자 토큰',{token, pk})



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

    const togglePushNotification = () => {
        setPushNotificationEnabled(!pushNotificationEnabled);
    };

    const renderBackButton = () => {
        return (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
        );
    };

    const fetchUserProfile = async (pk) => {
        

        try {
            // 서버에서 유저 프로필 정보를 가져오는 API 엔드포인트로 수정
            const djServer = await fetch(`http://172.30.1.7:8000/accounts/profile/${pk}/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}` // 토큰 추가
                },
            });

            if (djServer.status === 200) {
                const userData = await djServer.json(); // JSON 응답 파싱
                if (userData.result) { 
                    const profileImage = userData.result.profileImage;
                    const username = userData.result.username;
                    setProfileImage(profileImage);
                    setUsername(username);

                    console.log(username);
            }
               
            } else {
                console.error('사용자 정보를 불러오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('사용자 정보를 불러오는 데 실패했습니다1:', error);
        }};

           

    useEffect(() => {
        fetchUserProfile(pk)
    }, []);


    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigation(item.screen)}
        >
            <Text style={styles.buttonText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {renderBackButton()}
            </View>
            <Text style={styles.appName}>GreenDan</Text>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <Text style={styles.welcomeText}>환영합니다!</Text>
            <Text style={styles.username}>{username}</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.buttonList}
            />
            <View style={styles.pushNotificationContainer}>
                <Text style={styles.pushNotificationLabel}>공지사항의 푸시 알림 설정</Text>
                <Switch
                    value={pushNotificationEnabled}
                    onValueChange={togglePushNotification}
                />
            </View>

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
        width: 250,
    },
    buttonContainer: {
        backgroundColor: '#2D5E40',
        paddingTop: 20,
        borderRadius: 10,
        margin: 5,
        height: 70,
    },
    buttonText: {
        fontSize: 18,
        color: '#CBDFC0',
        textAlign: 'center',
        alignItems: 'center',
        margin: 5,
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
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    backButton: {
        padding: 10,
        left: 140,
        top: 10,
    },
    pushNotificationContainer: {
        top: -80,
    },
});

export default Mypage;
