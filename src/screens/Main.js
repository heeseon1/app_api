import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Result from './screensPhoto/Result';

const Main = () => {
    const navigation = useNavigation();

    const data = [
        {
            id: '1',
            title: '토마토\n잎 곰팡이병',
            image: require('../../assets/tomatoleafmold1.jpg'),
            explanation: `
                잎의 일차 감염에서 꽃 (특히 종자를 생산하는 작물에서 위험) 
                ...
            `,
        },
        {
            id: '2',
            title: '토마토\n황화잎말이\n바이러스',
            image: require('../../assets/yellowleafcurlVirus1.jpg'),
            explanation: `
                토마토 황화잎말이병은 토마토 
                Yellow Leaf Curl Virus 
                (TYLCV)에 의하여 발생하는 바이러스병해다.
            `,
        },
    ];

    const handleMagazine = (item) => {
        navigation.navigate('Magazine', {
            title: item.title,
            image: item.image,
            explanation: item.explanation,
        });
    };

    const resultData = [
        {
            id: '1',
            title: '토마토 잎 곰팡이병',
            image: require('../../assets/tomatoleafmold3.jpg'),
            explanation: `
                잎의 일차 감염에서 꽃 (특히 종자를 생산하는 작물에서 위험) 
                ...
            `,
            datetime: '2023-06-10 15:30', // 날짜 정보 추가
            bookmarked: false, // 북마크 여부 추가
        },
        {
            id: '2',
            title: '토마토 황화잎말이 바이러스',
            image: require('../../assets/yellowleafcurlVirus3.jpg'),
            explanation: `
                토마토 황화잎말이병은 토마토 
                Yellow Leaf Curl Virus 
                (TYLCV)에 의하여 발생하는 바이러스병해다.
            `,
            datetime: '2023-08-01 12:30',
            bookmarked: false,
        },
        {
            id: '3',
            title: '토마토 황화잎말이 바이러스',
            image: require('../../assets/yellowleafcurlVirus5.jpg'),
            explanation: `
                토마토 황화잎말이병은 토마토 
                Yellow Leaf Curl Virus 
                (TYLCV)에 의하여 발생하는 바이러스병해다.
            `,
            datetime: '2023-08-10 19:30',
            bookmarked: false,
        },
        {
            id: '4',
            title: '토마토 황화잎말이 바이러스',
            image: require('../../assets/yellowleafcurlVirus4.jpg'),
            explanation: `
                토마토 황화잎말이병은 토마토 
                Yellow Leaf Curl Virus 
                (TYLCV)에 의하여 발생하는 바이러스병해다.
            `,
            datetime: '2023-08-10 19:30',
            bookmarked: false,
        },
        {
            id: '5',
            title: '토마토 잎 곰팡이병',
            image: require('../../assets/tomatoleafmold4.jpg'),
            explanation: `
                잎의 일차 감염에서 꽃 (특히 종자를 생산하는 작물에서 위험) 
                ...
            `,
            datetime: '2023-08-13 15:20', // 날짜 정보 추가
            bookmarked: false, // 북마크 여부 추가
        },
    ];


    const handleRecord = (item) => {
        navigation.navigate('Result_', {
            title: item.title,
            image: item.image,
            explanation: item.explanation,
            date: item.datetime, // 추가: 날짜 정보 전달
            bookmarked: item.bookmarked, // 추가: 북마크 여부 전달
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.magazineItem}
            onPress={() => handleMagazine(item)}
        >
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.smallTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    const itemRenderer = ({ item }) => (
        <TouchableOpacity
            style={styles.magazineItem}
            onPress={() => handleRecord(item)}
        >
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.smallTitle}>{item.title}</Text>
                <View style={styles.dateContainer}>
                    <View style={styles.dateBackground}></View>
                    <Text style={styles.dateText}>Date: {item.datetime}</Text>
                </View>
                
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>

                <Text style={styles.title}>자주 발병하는 병해</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <Text style={styles.container2}>나의 지난 기록</Text>
                    <TouchableOpacity onPress={handleRecord} style={styles.magazineContainer}>
                            <FlatList
                            data={resultData}
                            renderItem={itemRenderer}
                            keyExtractor={item => item.id}
                        />
                        
                    </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
    },
    title: {
        alignItems: 'center',
        color: '#2D5E40',
        fontSize: 20,
        margin: 20,
    },
    image: {
        width: 250,
        height: 180,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    smallTitle: {
        width: 80,
        height: 180,
        backgroundColor: '#808080',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        color: 'white',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    magazineText: {
        width: 80,
        height: 130,
        backgroundColor: '#808080',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    magazineContainer: {
        flexDirection: 'row',
    },
    container2: {
        margin: 20,
        marginTop: 30,
        alignItems: 'center',
        color: '#2D5E40',
        fontSize: 20,
        flex: 1,
        paddingTop: 30,
    },
    magazineContainer: {
        flexDirection: 'row',
        left: 10,
    },
    magazineItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    dateBackground: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // 투명한 회색 배경
    },
    dateText: {
        color: 'white',
    },
});

export default Main;

