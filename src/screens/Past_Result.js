import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Past_Result = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Icon name="arrow-back" size={30} color="#8CB972" />
            </TouchableOpacity>
            <Text style={styles.title}>식물 진단 결과</Text>
            <Image source={require('../../assets/yellowleafcurlVirus4.jpg')} style={styles.image} />
            <Text style={styles.datetime}>2023년 8월 1일 15:35</Text>
                <Text style={styles.description}>
                    토마토 황화잎말이 바이러스{"\n"}
                    {"\n"}
                    식물에 대한 진단 결과 설명이
                    이곳에 들어갑니다.{"\n"}
                    식물의 상태와 관련된 정보를
                    자세히 설명해주세요.
                </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#E5EFDF',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        color: '#2D5E40',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 250,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    datetime: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    description: {
        margin: 20,
        fontSize: 16,
        textAlign: 'left',
        color: '#333',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#8CB972',
        alignItems: 'center',
        padding: 30,
        width: 300,
    },
});

export default Past_Result;


