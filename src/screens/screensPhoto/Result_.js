import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Result_ = ({ route }) => {
    const navigation = useNavigation();
    const { title, image, explanation, date, bookmarked, updateBookmark, id, token } = route.params;
    console.log('파라미터',route.params);

    const [isBookmarked, setIsBookmarked] = useState(bookmarked);

    const result_date = new Date(date);
    const year = result_date.getFullYear();
    const month = String(result_date.getMonth() + 1).padStart(2, '0');
    const day = String(result_date.getDate()).padStart(2, '0');
    const hours = String(result_date.getHours()).padStart(2, '0');
    const minutes = String(result_date.getMinutes()).padStart(2, '0');
  
    const formattedDate = `Date: ${year}-${month}-${day} ${hours}:${minutes}`;

    useEffect(() => {
        setIsBookmarked(bookmarked);
    }, [bookmarked]);

    const toggleBookmark = async () => {
        try {
            const response = await fetch(
                `http://192.168.200.182:8000/home/history/${id}/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ bookmarked: !isBookmarked }),
                }
            );

            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }

            console.log(isBookmarked)

            // 서버에 북마크 상태 업데이트 요청 후, 클라이언트의 상태도 업데이트합니다.
            const updatedBookmark = !isBookmarked;
            setIsBookmarked(updatedBookmark);
            console.log('업데이ㅡ',updatedBookmark)

            route.params.updateBookmark({ id: id, bookmarked: !updatedBookmark });
            console.log('아이디',id,updatedBookmark)

        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const getImage = (imagepath) => {
        try {
            return `http://192.168.200.182:8000${imagepath}`;
        } catch (error) {
            console.log('이미지 URL을 가져오는 오류 발생:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#2D5E40" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <Image source={{ uri: getImage(image) }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.date}>{formattedDate}</Text>
                    <View style={styles.bookmarkContainer}>
                        <Text style={styles.bookmarkText}>Bookmarked: </Text>
                        <TouchableOpacity onPress={toggleBookmark}>
                            <Icon
                                name={isBookmarked ? 'bookmark' : 'bookmark-border'}
                                size={24}
                                color={isBookmarked ? 'blue' : 'gray'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.explanation}>{explanation}</Text>
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
        width: '90%',
        height: 250,
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
        padding: 20,
        width: '90%',
    },
    infoContainer: {
        alignItems: 'flex-start',
        margin: 10,
        left: "-20%",
        marginBottom: 20,
    },
    bookmarkContainer: {
        flexDirection: 'row',
    },
    bookmarkText: {
        fontSize: 16,
    },
});

export default Result_;
