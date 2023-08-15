import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';



const NoticeDetail = ({ route }) => {
    const navigation = useNavigation();
    const { title, content ,explanation, date } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#2D5E40" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
                <Text style={styles.explanation}>{explanation}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#8CB972',
    },
    backButton: {
        position: 'absolute',
        top: 25,
        zIndex: 1,
        right: 30,
    },
    title: {
        fontSize: 30,
        color: '#E5EFDF',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40,
        padding: 20,
    },
    content: {
        fontSize: 18,
        color: '#2D5E40',
        marginBottom: 20,
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
        padding: 30,
        width: '100%',
    },
    date: {
        padding: 10,
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
});

export default NoticeDetail;
