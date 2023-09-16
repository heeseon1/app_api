import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DjangoIP from '../components/SetIP';

const Magazine = ({ route }) => {
    const navigation = useNavigation();
    const { blightId} = route.params;
    const [blight, setBlights] = useState([]);

    useEffect(() => {
        fetch(`${DjangoIP}/home/blight/${blightId}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('네트워크 오류');
                }
                return response.json();
            })
            .then((data) => setBlights(data.result))
            .catch((error) => console.error('요청 에러: ', error));
    }, [blightId]);

    if (!blight) {
        return <Text>Loading...</Text>;
    }

    const getImage = (imagePath) => {
        try {
            return `${DjangoIP}${imagePath}`;
        } catch (error) {
            console.error('이미지 URL을 가져오는 중 오류 발생:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#2D5E40" />
                </TouchableOpacity>
                <Text style={styles.title}>{blight.name}</Text>
                <Image source={{uri: getImage(blight.blight_img)}} style={styles.image} />
                <Text style={styles.explanation}>{blight.causation}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 25,
        zIndex: 1,
        right: 30,
    },
    title: {
        fontSize: 30,
        color: '#8CB972',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40,
    },
    image: {
        width: 300,
        height: 250,
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 20,
    },
    explanation: {
        fontSize: 16,
        backgroundColor: '#E5EFDF',
        borderRadius: 10,
        color: '#2D5E40',
        borderWidth: 1,
        borderColor: '#2D5E40',
        padding: 10,
        width: '100%',
    },
});

export default Magazine;
