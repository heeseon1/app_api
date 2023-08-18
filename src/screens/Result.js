    import React, {useState} from 'react';
    import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
    Modal,
    } from 'react-native';
    import Icon from 'react-native-vector-icons/MaterialIcons';
    import {useNavigation} from '@react-navigation/native';
    import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
    import DateTimePicker from '@react-native-community/datetimepicker';

    const Tab = createMaterialTopTabNavigator();

    const Result = ({route}) => {
    const navigation = useNavigation();

    const resultData = [
        {
        id: '1',
        title: '토마토 잎 곰팡이병',
        image: require('../../assets/tomatoleafmold3.jpg'),
        explanation: `잎의 일차 감염에서 꽃 (특히 종자를 생산하는 작물에서 위험) ...`,
        datetime: '2023-06-10 15:30', // 날짜 정보 추가
        bookmarked: false, // 북마크 여부 추가
        },
        {
        id: '2',
        title: '토마토 황화잎말이 바이러스',
        image: require('../../assets/yellowleafcurlVirus3.jpg'),
        explanation: `토마토 황화잎말이병은 토마토 Yellow Leaf Curl Virus (TYLCV)에 의하여 발생하는 바이러스병해다.`,
        datetime: '2023-08-01 12:30',
        bookmarked: false,
        },
        {
        id: '3',
        title: '토마토 황화잎말이 바이러스',
        image: require('../../assets/yellowleafcurlVirus5.jpg'),
        explanation: `토마토 황화잎말이병은 토마토 Yellow Leaf Curl Virus (TYLCV)에 의하여 발생하는 바이러스병해다.`,
        datetime: '2023-08-10 19:30',
        bookmarked: false,
        },
        {
        id: '4',
        title: '토마토 황화잎말이 바이러스',
        image: require('../../assets/yellowleafcurlVirus4.jpg'),
        explanation: `토마토 황화잎말이병은 토마토 Yellow Leaf Curl Virus (TYLCV)에 의하여 발생하는 바이러스병해다.`,
        datetime: '2023-08-10 19:30',
        bookmarked: false,
        },
        {
        id: '5',
        title: '토마토 잎 곰팡이병',
        image: require('../../assets/tomatoleafmold4.jpg'),
        explanation: `잎의 일차 감염에서 꽃 (특히 종자를 생산하는 작물에서 위험) ...`,
        datetime: '2023-08-13 15:20', // 날짜 정보 추가
        bookmarked: false, // 북마크 여부 추가
        },
    ];

    const [data, setData] = useState(resultData);
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [sortAscending, setSortAscending] = useState(true); // 추가: 정렬 순서 상태

    const handleBookmark = item => {
        const updatedData = data.map(dataItem => {
        if (dataItem.id === item.id) {
            const updatedItem = {...dataItem, bookmarked: !dataItem.bookmarked};
            if (updatedItem.bookmarked) {
            setBookmarkedItems(prevBookmarks => [...prevBookmarks, updatedItem]);
            } else {
            setBookmarkedItems(prevBookmarks =>
                prevBookmarks.filter(bookmark => bookmark.id !== item.id),
            );
            }
            return updatedItem;
        }
        return dataItem;
        });
        setData(updatedData);
    };

    const handleResult = item => {
        navigation.navigate('Result_', {
        title: item.title,
        image: item.image,
        explanation: item.explanation,
        date: item.datetime,
        bookmarked: item.bookmarked,
        updateBookmark: handleBookmark,
        });
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const handleCalendarIconPress = () => {
        setIsCalendarVisible(true);
    };

    const handleDateSelect = (event, date) => {
        if (date !== undefined) {
        setSelectedDate(date);
        setIsCalendarVisible(false);
        // 여기서 선택한 날짜로 검색하는 로직을 수행하세요.
        // 검색 결과를 filteredData에 업데이트하세요.
        } else {
        setIsCalendarVisible(false);
        }
    };

    const handleSearch = () => {
        let searchData = data;

        // 선택한 날짜로 검색하는 로직 추가
        if (selectedDate) {
        const formattedSelectedDate = selectedDate.split('T')[0]; // 선택한 날짜에서 시간 부분 제거
        searchData = data.filter(item =>
            item.datetime.startsWith(formattedSelectedDate),
        );
        }

        // 제목으로 검색어를 필터링
        searchData = searchData.filter(item => item.title.includes(searchQuery));

        setFilteredData(searchData);
    };

    const handleSortIconPress = () => {
        const sortedData = [...data];
        sortedData.sort((a, b) => {
        if (sortAscending) {
            return new Date(a.datetime) - new Date(b.datetime);
        } else {
            return new Date(b.datetime) - new Date(a.datetime);
        }
        });

        setData(sortedData);
        setSortAscending(!sortAscending);
    };

    const renderCalendarIcon = () => (
        <TouchableOpacity onPress={handleCalendarIconPress}>
        <Icon name="date-range" size={30} color="gray" />
        </TouchableOpacity>
    );

    const renderSortIcon = () => (
        <TouchableOpacity onPress={handleSortIconPress}>
        <Icon
            name={sortAscending ? 'arrow-upward' : 'arrow-downward'}
            size={30}
            color="gray"
        />
        </TouchableOpacity>
    );

    const renderItem = ({item}) => (
        <TouchableOpacity
        style={styles.magazineItem}
        onPress={() => handleResult(item)}>
        <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.smallTitle}>{item.title}</Text>
            <View style={styles.dateContainer}>
            <View style={styles.dateBackground}></View>
            <Text style={styles.dateText}>Date: {item.datetime}</Text>
            </View>
            <TouchableOpacity onPress={() => handleBookmark(item)}>
            <Icon
                name={item.bookmarked ? 'bookmark' : 'bookmark-border'}
                size={40}
                color={item.bookmarked ? 'blue' : 'gray'}
            />
            </TouchableOpacity>
        </View>
        </TouchableOpacity>
    );

    return (
        <Tab.Navigator>
        <Tab.Screen
            name="Result"
            component={() => (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="제목으로 검색"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleSearch}>
                    <Icon name="search" size={30} color="#8CB972" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCalendarIconPress}>
                    <Icon name="date-range" size={30} color="#8CB972" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSortIconPress}>
                    <Icon
                        name={sortAscending ? 'arrow-upward' : 'arrow-downward'}
                        size={30}
                        color="#8CB972"
                    />
                    </TouchableOpacity>
                </View>
                </View>
                <FlatList
                data={filteredData.length > 0 ? filteredData : data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
                {isCalendarVisible && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateSelect}
                />
                )}
            </View>
            )}
        />
        <Tab.Screen name="MyBookmark">
            {() => (
            <View style={styles.container}>
                <FlatList
                data={bookmarkedItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            </View>
            )}
        </Tab.Screen>
        </Tab.Navigator>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    image: {
        width: '60%',
        height: 130,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    smallTitle: {
        width: '30%',
        height: 130,
        backgroundColor: '#808080',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        left: -5,
        color: 'white',
        paddingHorizontal: 5, // 텍스트 가운데 정렬을 위한 수정
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
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    magazineItem: {
        width: '100%',
    },
    dateText: {
        color: 'white',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    calendarModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeButton: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
        color: 'white',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    });

    export default Result;
