import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DjangoIP from '../../components/SetIP';

const EditInquiry = ({ route }) => {
    const navigation = useNavigation();
    const { label, datetime, explanation, pk } = route.params;

    const [editedLabel, setEditedLabel] = useState(label);
    const [editedExplanation, setEditedExplanation] = useState(explanation);

    const handleSavePress = async () => {
        try {
            const djServer = `${DjangoIP}/info/qna/edit/${pk}/`;

            const requestData = {
                newTitle: label,
                newContent: explanation,
            };

            const authToken = await AsyncStorage.getItem('authToken');
            console.log(`authToken 출력: ${authToken}`);
            if (!authToken) {
                console.error('authToken 없음');
                return;
            }
            console.log('토큰 가져오기 성공', authToken);
    

            const response = await fetch(djServer, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(requestData),
            });
            console.log(response);

            if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다.');
            }
            navigation.navigate('Inquiry_style', { label: editedLabel, datetime, explanation: editedExplanation, pk });
        } catch (error) {
            console.error(`PUT 요청 중 오류 발생: ${error}`);
            Alert.alert('오류', '수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.appName}>문의 내역 수정</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.labelText}>제목:</Text>
                <TextInput
                    style={styles.labelInput}
                    value={editedLabel}
                    onChangeText={text => setEditedLabel(text)}
                />
                <Text style={styles.explanationLabel}>내용:</Text>
                <TextInput
                    style={styles.explanationInput}
                    value={editedExplanation}
                    onChangeText={text => setEditedExplanation(text)}
                    multiline
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                    <Text style={styles.saveButtonText}>저장</Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D5E40',
    },
    content: {
        marginTop: 20,
    },
    labelText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    labelInput: {
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    explanationLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    explanationInput: {
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        height: 150,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#8CB972',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        color: 'white',
    },
});

export default EditInquiry;