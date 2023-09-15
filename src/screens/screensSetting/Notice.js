import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Notice = () => {
    const navigation = useNavigation();
    const [expandedItem, setExpandedItem] = useState(null);
    const [noticeData, setNoticeData] = useState([]);

    useEffect(() => {
        fetch('http://192.168.1.101:8000/info/report')
          .then((response) => {
            if (!response.ok) {
              throw new Error('네트워크 오류');
            }
            return response.json();
          })
          .then((data) => {
            if (data.result) {
              setNoticeData(data.result);
            } else {
              console.error('데이터 가져오기 실패');
            }
          })
          .catch((error) => console.error('요청 에러: ', error));
      }, []);


    const handleExpand = (item) => {
        setExpandedItem(item.id === expandedItem ? null : item.id);
    };

    const renderItem = ({ item }) => {

        const date = new Date(item.created_at);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        const formattedDate = `Date: ${year}-${month}-${day} ${hours}:${minutes}`;
    
    return (
        <TouchableOpacity style={styles.noticeItem} onPress={() => handleExpand(item)}>
            <View style={[styles.newBadge, { backgroundColor: item.isNew ? 'gray' : 'red' }]} />
            <View style={styles.noticeHeader}>
                <Text style={styles.noticeTitle}>{item.title}</Text>
                <Text style={styles.noticeDate}>{formattedDate}</Text>
            </View>
            {expandedItem === item.id && (
                <Text style={styles.noticeExplanation}>{item.content}</Text>
            )}
        </TouchableOpacity>
    )
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#2D5E40" />
            </TouchableOpacity>
            <View style={styles.container2}>
            <FlatList
                data={noticeData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            </View>
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
    container2: {
        marginTop: 50,
    },
    noticeItem: {
        marginBottom: 10,
        backgroundColor: '#E5EFDF',
        borderRadius: 10,
        padding: 20,
    },
    newBadge: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    noticeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    noticeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D5E40',
    },
    noticeDate: {
        color: 'gray',
    },
    noticeExplanation: {
        marginTop: 10,
        color: 'black',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 310,
        margin: 10,
    },
});

export default Notice;
