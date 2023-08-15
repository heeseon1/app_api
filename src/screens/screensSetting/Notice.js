import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Notice = () => {
    const navigation = useNavigation();
    const [clickedItems, setClickedItems] = useState([]);

    const data = [
        {
            id: 1,
            title: '공지사항 제목 1',
            content: '공지사항 내용 1',
            isNew: true,
            date: '2023-08-01',
            explanation: '안녕하세요. 유저 여러분 {"\n"} 이번 앱 런칭...',
        },
        {
            id: 2,
            title: '공지사항 제목 2',
            content: '공지사항 내용 2',
            isNew: false,
            date: '2023-08-02',
            explanation: '안녕하세요. 유저 여러분 {"\n"} 8월 12일에 점검이 있음을 {"\n"} 알려드립니다',
        },
        // Add more data items as needed
    ];

    const handleNotice = (item) => {
        const updatedClickedItems = clickedItems.includes(item.id)
            ? clickedItems.filter(id => id !== item.id)
            : [...clickedItems, item.id];

        setClickedItems(updatedClickedItems);

        navigation.navigate('NoticeDetail', {
            title: item.title,
            content: item.content,
            explanation: item.explanation,
            date: item.date,
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.noticeItem} onPress={() => handleNotice(item)}>
            <View style={[styles.newBadge, { backgroundColor: item.isNew ? 'gray' : 'red' }]} />
            <Text style={styles.noticeTitle}>{item.title}</Text>
            <Text style={styles.noticeDate}>{item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#2D5E40" />
                </TouchableOpacity>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#8CB972',
        borderColor: 'gray',
    },
    noticeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#E5EFDF',
        padding: 20,
        borderRadius: 10,
    },
    newBadge: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    noticeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: '#2D5E40',
    },
    noticeDate: {
        color: 'gray',
    },
    headerRight: {
        marginRight: 15,
    },
    backButton: {
        left: 280,
        margin: 10,
        marginBottom: 20,
    },
});

export default Notice;
