import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Image, Alert, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Inquiry = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [content, setContent] = useState('');
    const [inquiries, setInquiries] = useState([]);
    const [title, setQnaTitle] = useState('');

    const {email, pk} = route.params;
    console.log('줬냐?',pk);

    const fetchInquiries = async () => {
        console.log('문의 내역 로드 시작');
        try {
            const response = await fetch(`http://172.18.80.87:8000/info/qna/`);
            if (!response.ok) {
                throw new Error('문의 내역 로드 실패');
            }
            const data = await response.json();
            setInquiries(data.result);
            console.log('응답: ', JSON.stringify(data));
        } catch (error) {
            console.error(`문의 내역 로드 중 오류 : ${error}`);
        }
    };

    useEffect(() => {
        console.log('문의 내역 가져오기');
        fetchInquiries();
    }, [email]);

    const submitInquiry = async () => {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            console.log(`authToken 출력: ${authToken}`);
            if (!authToken) {
                console.error('authToken 없음');
                return;
            }

            console.log('토큰 가져오기 성공', authToken);

            const requestData = {
                title: title,
                content: content,
                email: email,
            };
            console.log('email: ', email),
            console.log('title:', title);
            console.log('content:', content);

            const response = await fetch('http://172.18.80.87:8000/info/qna/', {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            console.log(response);

            if (!response.ok) {
                throw new Error('문의 제출 실패');
            }
            console.log('문의 제출 성공!');
            setIsModalVisible(false);
            await fetchInquiries();
        } catch (error) {
            console.error(`문의 제출 중 오류 발생: ${error}`);
        }
    }

    const handleInquirySubmit = async () => {
        if (title.length === 0) {
            Alert.alert('제목을 입력해주세요');
        } else if (content.length === 0) {
            Alert.alert('문의 내용을 입력해주세요');
        } else {
            try {
                await submitInquiry();
                setContent('');
                setQnaTitle('');
                setIsModalVisible(false);
                await fetchInquiries();
            } catch (error) {
                console.error(`문의 제출 중 오류 발생: ${error}`);
                return;
            }
        }
    };

    const closeSubmitPopup = () => {
        setIsModalVisible(false);
    };

    const showCompletionPopup = () => {
        Alert.alert('문의가 성공적으로 작성되었습니다.');
    };

    console.log('inquiries 배열: ', JSON.stringify(inquiries));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.appName}>문의하기</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#2D5E40" />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.writeButton}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Text style={styles.writeButtonText}>문의 작성하기</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={inquiries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            style={styles.inquiryItem}
                            onPress={() => {
                                navigation.navigate('Inquiry_style', {
                                    label: item.title,
                                    datetime: item.created_at,
                                    explanation: item.content,
                                    pk
                                });
                            }}
                        >
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.date}>{item.created_at}</Text>
                        </TouchableOpacity>
                    );
                }}
                contentContainerStyle={styles.flatListContent}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeSubmitPopup}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeSubmitPopup}
                    >
                        <Icon name="close" size={30} color="#2D5E40" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>문의 작성하기</Text>

                    <TextInput 
                        style={styles.titleInput}
                        placeholder="제목을 입력하세요"
                        placeholderTextColor='gray'
                        multiline={true}
                        value={title}
                        onChangeText={text => setQnaTitle(text)}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="문의 내용을 입력하세요"
                        placeholderTextColor='gray'
                        multiline={true}
                        value={content}
                        onChangeText={text => setContent(text)}
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleInquirySubmit}
                    >
                        <Text style={styles.submitButtonText}>작성 완료</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D5E40',
    },
    content: {
        alignItems: 'center',
    },
    writeButton: {
        backgroundColor: '#8CB972',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
        margin: 20,
    },
    writeButtonText: {
        fontSize: 18,
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2D5E40',
    },
    titleInput: {
        borderWidth: 1,
        borderColor: '#2D5E40',
        borderRadius: 5,
        padding: 10,
        minHeight: 50,
        textAlignVertical: 'top',
        color: 'black',
    },
    submitButton: {
        backgroundColor: '#8CB972',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        fontSize: 18,
        color: 'white',
    },
    closeButton: {
        right: -310,
    },
    inquiryItem: {
        borderBottomWidth: 1,
        borderColor: '#8CB972',
        paddingBottom: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: 'gray',
    },
    flatListContent: {
        flexGrow: 1,
    },
});

export default Inquiry;