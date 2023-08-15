import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, FlatList, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';


const MyProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState('견습농부');
    const [profileImage, setProfileImage] = useState(require('../../../assets/profile_tomato.jpg'));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newNickname, setNewNickname] = useState('');

    const navigation = useNavigation();


    const handleEditProfilePicture = () => {
        const options = {
        title: '프로필 사진 선택',
        cancelButtonTitle: '취소',
        takePhotoButtonTitle: '카메라로 찍기',
        chooseFromLibraryButtonTitle: '갤러리에서 선택',
        quality: 0.5,
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        };

        ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            const source = { uri: response.uri };

            setProfileImage(source);
        }
        });
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
        // Implement logic to save profile changes
        setIsModalVisible(false);
        Alert.alert('프로필 수정 완료', '프로필이 수정되었습니다!');
    };

    const handleConfirmGoBack = () => {
        Alert.alert(
        '프로필 수정 취소',
        '프로필 수정을 취소하시겠습니까?',
        [
            { text: '확인', onPress: () => navigation.goBack() }, // 이전 화면으로 이동 로직 추가
            { text: '취소', onPress: () => {} },
        ]
        );
    };


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
            <Image source={profileImage} style={styles.profileImage} />
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
                <TouchableOpacity
                style={[styles.editNicknameButton, { backgroundColor: newNickname ? 'black' : 'gray' }]}
                onPress={handleSaveNickname}
                disabled={!newNickname}
                >
                <Text style={styles.editNicknameButtonText}>완료</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editNicknameButton} onPress={handleCancelNickname}>
                <Text style={styles.editNicknameButtonText}>취소</Text>
                </TouchableOpacity>
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
                <TouchableOpacity style={styles.modalButton} onPress={handleSaveProfile}>
                <Text>확인</Text>
                </TouchableOpacity>
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
});
    
export default MyProfile;
    