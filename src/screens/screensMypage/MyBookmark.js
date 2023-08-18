import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyBookmark = ({ data = [],  handleBookmark }) => {
    const navigation = useNavigation();

    const handleResult = (item) => {
        navigation.navigate('Result_', {
            title: item.title,
            image: item.image,
            explanation: item.explanation,
            date: item.datetime,
            bookmarked: item.bookmarked,
            updateBookmark: handleBookmark, // 북마크 업데이트 함수 전달
        });
    };
    

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.magazineItem}
            onPress={() => handleResult(item)}
        >
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
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


