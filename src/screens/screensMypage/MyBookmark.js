import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';

const MyBookmark = ({ handleBookmarkAndUpdateData }) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const route = useRoute();
    const { email } = route.params;

    console.log('데이터:', email);
    const fetchData = async () => {
        try {
          const response = await fetch('http://192.168.200.182:8000/home/history/');
          if (!response.ok) {
            throw new Error('네트워크 오류');
          }
          const data = await response.json();
          if (data.code === 200) {
            // email 조건과 북마크 필드가 True인 경우 필터링
            const filteredData = data.result.filter((item) => item.email === email&& item.bookmarked);
            setData(filteredData);
          } else {
            console.error('데이터 가져오기 실패:', data.message);
          }
        } catch (error) {
          console.error('요청 에러: ', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [email]);

      console.log('데이터:', data);
    
      const getImage = (imagepath) => {
        try {
          return `http://192.168.200.182:8000${imagepath}`;
        } catch (error) {
          console.log('이미지 URL을 가져오는 오류 발생:', error);
        }
      };

      const handleResult = (item) => {
        navigation.navigate('Result_', {
          title: item.name,
          image: item.history_img,
          explanation: item.causation,
          date: item.created_at,
          bookmarked: item.bookmarked,
          updateBookmark: handleBookmarkAndUpdateData,
        });
      };
    

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.magazineItem}
            onPress={() => handleResult(item)}
        >
            <View style={styles.imageContainer}>
                <Image source={{uri: getImage(item.history_img)}} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.datetime}>Date: {item.name}</Text>
                    <TouchableOpacity style={styles.bookmarkContainer}>
                        <Icon
                            name={item.bookmarked ? 'bookmark' : 'bookmark-border'}
                            size={24}
                            color={item.bookmarked ? 'blue' : 'gray'}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.smallTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.heading}>My Bookmarks</Text>
                {data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <Text style={styles.emptyMessage}>No bookmarks yet.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptyMessage: {
        textAlign: 'center',
        fontStyle: 'italic',
    },
    image: {
        width: '60%',
        height: 130,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        right: 10,
    },
    smallTitle: {
        width: '30%',
        height: 130,
        backgroundColor: '#8CB972',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        right: '35%',
        color: 'white',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    infoContainer: {
        flexDirection: 'row', // 변경: 가로로 배치
        justifyContent: 'space-between',
        alignItems: 'center', // 추가: 수직 가운데 정렬
        marginLeft: 10,
    },
    datetime: {
        fontSize: 14,
        color: 'white',
        position: 'absolute', // 변경: 절대 위치
        top: 50, // 변경: 위로 조정
        right: '250%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    bookmarkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        left: 80,
    },
    magazineItem: {
        width: '100%',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default MyBookmark;


