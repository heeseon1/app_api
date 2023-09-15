import React, { useState,  useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Result_ = ({route}) => {
    const navigation = useNavigation();
    const { title, image, explanation, date, bookmarked, updateBookmark, token } = route.params;

    const result_date = new Date(date);
    const year = result_date.getFullYear();
    const month = String(result_date.getMonth() + 1).padStart(2, '0');
    const day = String(result_date.getDate()).padStart(2, '0');
    const hours = String(result_date.getHours()).padStart(2, '0');
    const minutes = String(result_date.getMinutes()).padStart(2, '0');
  
    const formattedDate = `Date: ${year}-${month}-${day} ${hours}:${minutes}`;

    

    const getImage = (imagepath) => {
        try {
            return `http://192.168.1.101:8000${imagepath}`;
        } catch (error) {
            console.log('이미지 URL을 가져오는 오류 발생:', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.magazineItem}
            onPress={() => handleResult(item)}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: getImage(image) }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.datetime}>Date: {item.datetime}</Text>
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


    const [isBookmarked, setIsBookmarked] = useState(bookmarked);

    useEffect(() => {
        setIsBookmarked(bookmarked);
    }, [bookmarked]);

    const toggleBookmark = () => {
        const updatedBookmark = !isBookmarked;
        setIsBookmarked(updatedBookmark);
        if (updateBookmark) {
          // updateBookmark 함수가 정의되어 있는 경우에만 호출합니다.
          updateBookmark({ id: route.params.id, bookmarked: updatedBookmark });
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
                    <Text style={styles.date}>Date: {formattedDate}</Text>
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