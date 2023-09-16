import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, FlatList, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute, useFocusEffect  } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DjangoIP from '../../components/SetIP';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

const MyProfile = () => {
    const [response, setResponse] = useState(null); 
    const [isEditing, setIsEditing] = useState(false);
    const [Nickname, setNickname] = useState(username); //바꾼이름
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editusername, setNewUsername] = useState('');
    const [image, setImage] = useState(null); //바꾼이미지

    const [imageUrl, setImageUrl] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    const navigation = useNavigation();

    const route = useRoute();
    const { token, pk, username, profileImage } = route.params; //기존 이름, 이미지

    useEffect(() => {
        if (profileImage) {
            const imageUrl = `${DjangoIP}${profileImage}`;
            console.log('이미지유알엘:',imageUrl)

            fetch(imageUrl)
                .then((response) => response.blob())
                .then((blob) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        const base64data = reader.result;
                        setImageBase64(base64data);
                    };
                })
                .catch((error) => {
                    console.error('이미지 다운로드 오류:', error);
                });

            setImageUrl(imageUrl);
        }
    }, [profileImage]);

    
    useFocusEffect(
        React.useCallback(() => {
            setNickname(username);
            setImage(profileImage);
        }, [username, profileImage])
    );


    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.5,
        };

        launchCamera(options, (response) => {
            if (!response.didCancel) {
                const source = { uri: response.uri };
                setImage(source);
            }
        });
    };

    const openGallery = async () => {
        const options = {
            mediaType: 'photo',
            quality: 0.5,
            includeBase64: true
        };
    
        try {
            launchImageLibrary(options, async (response) => {
                console.log(response);
                if (response.didCancel) {
                    return;
                } else if (response.errorCode) {
                    console.log('이미지 에러:', response.errorCode);
                }

                setResponse(response);
    
                const formData = new FormData();
                formData.append('profileImg', {
                    uri: response.assets[0].uri,
                    type: response.assets[0].type,
                    name: response.assets[0].fileName,
                });
    
                try {
                    const djServer = await fetch(`${DjangoIP}/accounts/change/profile/${pk}/`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: formData,
                    });
    
                    if (djServer.status === 200) {
                        console.log('프로필 사진 업로드 완료');
                    } else {
                        console.error('프로필 사진 업로드 실패');
                    }
                } catch (error) {
                    console.error('프로필 사진 업로드 중 오류:', error);
                }
            });
        } catch (error) {
            console.error('갤러리 열기 중 오류:', error);
        }
    };
    



    const handleEditProfilePicture = () => {
        setIsModalVisible(true);
    };

    const handleEditNickname = () => {
        setIsEditing(true);
    };

    const handleNicknameChange = (text) => {
        setNewUsername(text);
    };

    const handleSaveNickname = () => {
        if (editusername) {
            setNickname(editusername);
            setIsEditing(false);
        }
    };

    const handleCancelNickname = () => {
        setIsEditing(false);
    };

    const handleSaveProfile = async () => {
        if (editusername) {
            try {
                const djServer = await fetch(`${DjangoIP}/accounts/change/username/`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ newUsername: editusername }),
                });
                
                if (djServer.status === 200) {
                    setNickname(editusername);
                    console.log('닉네임이 업데이트되었습니다.');
                } else {
                    console.error('닉네임 업데이트 실패');
                }
            } catch (error) {
                console.error('닉네임 업데이트 중 오류:', error);
            }
        }

        setIsModalVisible(false);
        Alert.alert('프로필 수정 완료', '프로필이 수정되었습니다!');
        navigation.navigate('Mypage', { editusername, token, pk, image: response.assets[0].uri });
    };

    const handleConfirmGoBack = () => {
        Alert.alert(
            '프로필 수정',
            '프로필 수정을 완료하시겠습니까?',
            [
                { text: '확인', onPress: () => handleSaveProfile() }, // 이전 화면으로 이동 로직 추가
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
                    {response ? ( 
                         <Image source={{ uri: response.assets[0].uri }} style={styles.profileImage} />
                    ) : profileImage ? (
                        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
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
                            value={editusername}
                            onChangeText={handleNicknameChange}
                            placeholder="새 닉네임 입력"
                            placeholderTextColor="gray"
                        />
                        <View style={styles.editNicknameButtonGroup}>
                            <TouchableOpacity
                                style={[styles.editNicknameButton, styles.confirmButton, { backgroundColor: editusername ? 'black' : 'gray' }]}
                                onPress={handleSaveNickname}
                                disabled={!editusername}
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
                        <Text style={styles.nicknameText}>{Nickname}</Text>
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
    buttonText2: {},
    editNicknameButtonGroup: {
        flexDirection: 'column',
        alignItems: 'center',
        top: 15,
    },
});

export default MyProfile;
