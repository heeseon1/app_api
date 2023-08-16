import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, FlatList, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const MyProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState('견습농부');
    const [profileImage, setProfileImage] = useState(require('../../../assets/profile_tomato.jpg'));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newNickname, setNewNickname] = useState('');

    const navigation = useNavigation();

    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.5,
        };

        launchCamera(options, (response) => {
            if (!response.didCancel) {
                const source = { uri: response.uri };
                setProfileImage(source);
            }
        });
    };

    const openGallery = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.5,
        };

        launchImageLibrary(options, (response) => {
            if (!response.didCancel) {
                const source = { uri: response.uri };
                setProfileImage(source);
            }
        });
    };

    const handleEditProfilePicture = () => {
        setIsModalVisible(true);
    };

    const handleEditNickname = () => {
        setIsEditing(true);
    };

    const handleNicknameChange = (text) => {
        setNewNickname(text);
    };

    const handleSaveNickname = () => {
        if (newNickname) {
            setNickname(newNickname);
            setIsEditing(false);
        }
    };

    const handleCancelNickname = () => {
        setIsEditing(false);
    };

    const handleSaveProfile = () => {
        if (newNickname || profileImage.uri) {
            if (newNickname) {
                setNickname(newNickname);
                navigation.navigate('Mypage', { newNickname }); // 닉네임 값 전달
            }
            setIsModalVisible(false);
            Alert.alert('프로필 수정 완료', '프로필이 수정되었습니다!');
        } else {
            setIsModalVisible(false);
        }
    };

    const handleConfirmGoBack = () => {
        Alert.alert(
            '프로필 수정',
            '프로필 수정을 완료하시겠습니까?',
            [
                { text: '확인', onPress: () => navigation.goBack() }, // 이전 화면으로 이동 로직 추가
                { text: '취소', onPress: () => {} },
            ]
        );
    };

    const buttons = [
        { key: 'camera', title: '카메라', onPress: openCamera },
        { key: 'gallery', title: '갤러리', onPress: openGallery },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.button} onPress={item.onPress}>
            <Text style={styles.buttonTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.appName}>GreenDan</Text>
                <TouchableOpacity onPress={handleConfirmGoBack}>
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.profileImageContainer}>
                <TouchableOpacity onPress={handleEditProfilePicture}>
                    {profileImage ? ( // profileImage가 null 또는 정의되지 않았는지 확인
                        <Image source={profileImage} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profileImagePlaceholder}>
                            <Icon name="person" size={120} color="white" />
                        </View>
                    )}
                    <Icon name="camera" size={24} color="white" style={styles.cameraIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.nicknameContainer}>
                {isEditing ? (
                    <View style={styles.editNicknameRow}>
                        <TextInput
                            style={styles.editNicknameInput}
                            value={newNickname}
                            onChangeText={handleNicknameChange}
                            placeholder="새 닉네임 입력"
                            placeholderTextColor="gray"
                        />
                        <View style={styles.editNicknameButtonGroup}>
                            <TouchableOpacity
                                style={[styles.editNicknameButton, styles.confirmButton, { backgroundColor: newNickname ? 'black' : 'gray' }]}
                                onPress={handleSaveNickname}
                                disabled={!newNickname}
                            >
                                <Text style={styles.buttonText}>완료</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.editNicknameButton, styles.cancelButton2]} onPress={handleCancelNickname}>
                                <Text style={styles.buttonText2}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.nicknameRow}>
                        <Text style={styles.nicknameText}>{nickname}</Text>
                        <TouchableOpacity onPress={handleEditNickname}>
                            <Text style={styles.editNicknameText}>닉네임 수정</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalContent}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalText}>프로필 사진 변경</Text>
                        <FlatList
                            data={buttons}
                            renderItem={renderItem}
                            keyExtractor={item => item.key}
                            contentContainerStyle={styles.buttonContainer}
                        />
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                            <Text>취소</Text>
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
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginTop: 50,
        margin: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        color: 'gray',
    },
    nicknameContainer: {
        margin: 20,
        alignItems: 'center',
    },
    nicknameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nicknameText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    editNicknameText: {
        color: 'black',
        marginLeft: 10,
    },
    editNicknameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editNicknameInput: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        color: 'black',
        marginRight: 10,
    },
    editNicknameButton: {
        backgroundColor: 'gray',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    editNicknameButtonText: {
        color: 'white',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        height: 300,
    },
    modalText: {
        fontSize: 28,
        marginBottom: 10,
    },
    modalButton: {
        color: 'blue',
    },
    cancelButton: {
        color: 'red',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#8CB972',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: 200,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton2: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    confirmButton: {
        backgroundColor: 'black',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
    },
    buttonText2: {
    },
    editNicknameButtonGroup: {
        flexDirection: 'column',
        alignItems: 'center',
        top: 15,
    },
});

export default MyProfile;
