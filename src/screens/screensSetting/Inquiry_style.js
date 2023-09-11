import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const InquiryStyle = ({ route }) => {
    const navigation = useNavigation();
    const { label, datetime, explanation } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.appName}>문의 내역</Text>
                <Icon name="arrow-back" size={30} color="#2D5E40" onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{label}</Text>
                <Text style={styles.dateText}>Date: {datetime}</Text>
                <Text style={styles.explanationText}>{explanation}</Text>
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
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2D5E40',
    },
    dateText: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    explanationText: {
        fontSize: 16,
        color: 'black',
        backgroundColor: '#E5EFDF',
        borderWidth: 1,
        borderColor: '#2D5E40',
        borderRadius:10,
        padding: 20,
        margin: 10,
    },
});

export default InquiryStyle;