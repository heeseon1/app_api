import React, { useState,  useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Result_ = ({ route }) => {
    const navigation = useNavigation();
    const { title, image, explanation, date, bookmarked, updateBookmark } = route.params;

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

    const toggleBookmark = () => {
        const updatedBookmark = !isBookmarked;
        setIsBookmarked(updatedBookmark);
        updateBookmark({ id: route.params.id, bookmarked: updatedBookmark });
    };

    const getImage = (imagepath) => {
        try {
          return `http://172.18.80.87:8000${imagepath}`;
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
    bookmarkText: { // 북마크 텍스트 스타일 추가
        fontSize: 16,
    },
});

export default Result_;




