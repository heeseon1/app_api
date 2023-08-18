import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Inquiry = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [inquiryContent, setInquiryContent] = useState('');
    const [showSubmitPopup, setShowSubmitPopup] = useState(false); // 팝업 표시 여부 상태 추가

    const handleCheckboxToggle = (item) => {
        const updatedCheckedItems = checkedItems.includes(item)
            ? checkedItems.filter(checkedItem => checkedItem !== item)
            : [...checkedItems, item];
        
        setCheckedItems(updatedCheckedItems);
    };

    const handleInquirySubmit = () => {
        if (checkedItems.length === 0 || inquiryContent.length === 0) {
            // 조건을 만족하지 않는 경우 팝업을 띄웁니다.
            Alert.alert('문의 종류 체크와 내용을 모두 입력해주세요');
        } else {
            setCheckedItems([]);
            setInquiryContent('');
            setIsModalVisible(false);
            showCompletionPopup();
        }
    };

    const closeSubmitPopup = () => {
        setShowSubmitPopup(false);
    };

    const showCompletionPopup = () => {
        Alert.alert('문의가 성공적으로 작성되었습니다.');
    };

    const data = [
        { id: '오류신고', label: '오류신고' },
        { id: '추가 기능 제안', label: '추가 기능 제안' },
    ];

    const dataInquiry = [
        {id: '1',
            label: '오류신고',
            datetime: `2023-08-11 14:10`,
            explanation: `사진을 확대하면 심하게 깨진다`,
        },
        {id: '2',
            label: '오류신고',
            datetime: `2023-08-11 19:40`,
            explanation: `로딩 후 결과가 안나온다`,
        },
        {id: '3',
            label: '오류신고',
            datetime: `2023-08-14 13:00`,
            explanation: `갤러리 연결이 잘안된다`,
        },
        {id: '4',
            label: '추가 기능 제안',
            datetime: `2023-08-15 11:20`,
            explanation: `결과를 삭제하고 싶음`,
        },
        {id: '5',
            label: '오류신고',
            datetime: `2023-08-16 13:40`,
            explanation: `카메라 작동이 잘 안된다`,
        },
    ];

    const renderCheckbox = ({ item }) => (
        <TouchableOpacity
            style={[styles.checkbox, checkedItems.includes(item.id) && styles.checkedCheckbox]}
            onPress={() => handleCheckboxToggle(item.id)}
        >
            <Text style={styles.checkboxLabel}>{item.label}</Text>
        </TouchableOpacity>
    );

    const handleInquiry = (item) => {
        navigation.navigate('Inquiry_style', {
            label: item.label,
            datetime: item.datetime,
            explanation: item.explanation,
        });
    };

    const itemRenderer = ({ item }) => (
        <TouchableOpacity
            style={styles.magazineItem}
            onPress={() => handleInquiry(item)}
        >
            <View style={styles.containerInquriy}>

                <View style={styles.dateContainer}>
                    <Text style={styles.LabelText}>Label: {item.label}</Text>
                    <Text style={styles.dateText}>Date: {item.datetime}</Text>
                </View>
                
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsModalVisible(false)}
                    >
                        <Icon name="close" size={30} color="#2D5E40" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>문의 작성하기</Text>
                    <FlatList
                        data={data}
                        renderItem={renderCheckbox}
                        keyExtractor={item => item.id}
                        numColumns={2}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="문의 내용을 입력하세요"
                        placeholderTextColor='gray'
                        multiline={true}
                        value={inquiryContent}
                        onChangeText={text => setInquiryContent(text)}
                    />
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleInquirySubmit}
                        
                    >
                        <Text style={styles.submitButtonText}>작성 완료</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity onPress={handleInquiry} style={styles.magazineContainer}>
                            <FlatList
                            data={dataInquiry}
                            renderItem={itemRenderer}
                            keyExtractor={item => item.id}
                        />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D5E40',
    },
    content: {
        marginTop: 20,
        alignItems: 'center',
    },
    noInquiryText: {
        fontSize: 16,
        color: 'gray',
        margin: 40,
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
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    checkedCheckbox: {
        backgroundColor: '#8CB972',
        borderColor: '#8CB972',
        borderWidth: 10,
        borderRadius: 10,
    },
    checkboxLabel: {
        fontSize: 18,
        margin: 5,
        color: '#2D5E40',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#2D5E40',
        borderRadius: 5,
        padding: 10,
        top: -250,
        minHeight: 100,
        textAlignVertical: 'top',
        color: 'black',
        height: 300,
    },
    submitButton: {
        backgroundColor: '#8CB972',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        top: -230,
    },
    submitButtonText: {
        fontSize: 18,
        color: 'white',
    },
    closeButton: {
        right: -310,
    },
    dateContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    magazineContainer: {
        flexDirection: 'row',
    },
    magazineItem: {
        alignItems: 'center',
    },
    containerInquriy: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor:  '#2D5E40',
        backgroundColor: '#E5EFDF',
        width: 300,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    dateText: {
        color: 'gray',
        alignItems: 'center',
    },
    LabelText: {
        fontSize: 20,
        color: '#2D5E40',
        fontWeight: 'bold',
    },
});

export default Inquiry;
