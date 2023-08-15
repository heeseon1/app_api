import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Inquiry = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [inquiryContent, setInquiryContent] = useState('');

    const handleCheckboxToggle = (item) => {
        const updatedCheckedItems = checkedItems.includes(item)
            ? checkedItems.filter(checkedItem => checkedItem !== item)
            : [...checkedItems, item];
        
        setCheckedItems(updatedCheckedItems);
    };

    const handleInquirySubmit = () => {
        if (checkedItems.length > 0 && inquiryContent.length > 0) {
            // Handle inquiry submission logic here
            // You can send the inquiry to a backend server or perform any other action
            
            // Reset the state after submission
            setCheckedItems([]);
            setInquiryContent('');
            setIsModalVisible(false);
        }
    };

    const data = [
        { id: '오류신고', label: '오류신고' },
        { id: '추가 기능 제안', label: '추가 기능 제안' },
    ];

    const renderCheckbox = ({ item }) => (
        <TouchableOpacity
            style={[styles.checkbox, checkedItems.includes(item.id) && styles.checkedCheckbox]}
            onPress={() => handleCheckboxToggle(item.id)}
        >
            <Text style={styles.checkboxLabel}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.appName}>Your App Name</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#2D5E40" />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {checkedItems.length === 0 && (
                    <Text style={styles.noInquiryText}>현재 문의가 없습니다.</Text>
                )}
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
                        disabled={checkedItems.length === 0 || inquiryContent.length === 0}
                    >
                        <Text style={styles.submitButtonText}>작성 완료</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        marginBottom: 20,
        minHeight: 100,
        textAlignVertical: 'top',
        color: 'black',
    },
    submitButton: {
        backgroundColor: '#8CB972',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 18,
        color: 'white',
    },
    closeButton: {
        right: -310,
    },
});

export default Inquiry;
