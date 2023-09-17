import React, {useState, useEffect, useRef } from 'react';
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
import {useNavigation, useRoute } from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DjangoIP from '../components/SetIP';

const Tab = createMaterialTopTabNavigator();


const Result = () => {
const forceUpdate = useRef(null);
const navigation = useNavigation();
const route = useRoute();
const { token, email } = route.params;
const [userRecords, setUserRecords] = useState([]);
const [data, setData] = useState([]);
const [bookmarkedItems, setBookmarkedItems] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [filteredData, setFilteredData] = useState(userRecords);
const [sortAscending, setSortAscending] = useState(true); // 추가: 정렬 순서 상태
const [resultData, setResultData] = useState([]);
const [sortedData, setSortedData] = useState(userRecords);
const bookmarkedRecords = userRecords.filter(item => item.bookmarked);

const fetchData = async () => {
  try {
    const { email } = route.params;
    const response = await fetch(`${DjangoIP}/home/history/`);

    if (!response.ok) {
      throw new Error('네트워크 오류');
    }

    const data = await response.json();

    if (data.code === 200) {
      const filteredData = data.result.filter((item) => item.email === email);
      setUserRecords(filteredData);
      setFilteredData(filteredData);
      setSortedData(filteredData);
      
    } else {
      console.error('데이터 가져오기 실패:', data.message);
    }
  } catch (error) {
    console.error('요청 에러: ', error);
  }
};

useFocusEffect(
  React.useCallback(() => {
    fetchData();
  }, [route.params])
);


useEffect(() => {
  forceUpdate.current = forceUpdateFunction;
}, []);

useEffect(() => {
  fetchData();
  handleSortIconPress();
}, [email]);

const handleSortIconPress = () => {
  const sortedData = [...userRecords];
  console.log('정렬',sortedData)

  // 오름차순 정렬
  if (sortAscending) {
    sortedData.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateA - dateB;
    });
  } else {
    // 내림차순 정렬
    sortedData.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  }

  setSortedData(sortedData); 
  setSortAscending(!sortAscending);
  handleSearch();
};

const forceUpdateFunction = () => {
  setUserRecords([...userRecords]);
};



  
  const getImage = (imagepath) => {
    try {
      return `${DjangoIP}${imagepath}`;
    } catch (error) {
      console.log('이미지 URL을 가져오는 오류 발생:', error);
    }
  };






const handleBookmarkAndUpdateData = async (item) => {
  try {
    const response = await fetch(
      `${DjangoIP}/home/history/${item.id}/`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookmarked: !item.bookmarked }),
      }
    );

    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }
    
    const updatedData = data.map((dataItem) => {
      if (dataItem.id === item.id) {
        const updateItem = { ...dataItem, bookmarked: !dataItem.bookmarked };
        return updateItem;
      }
      return dataItem;
    });

    setData(updatedData);

  
  fetchData();

  } catch (error) {
    console.error('오류 발생:', error);
  }
};

const handleResult = (item) => {
  navigation.navigate('Result_', {
    id: item.id,
    title: item.name,
    image: item.history_img,
    explanation: item.causation,
    date: item.created_at,
    bookmarked: item.bookmarked,
    updateBookmark: handleBookmarkAndUpdateData,
    token: token,
    email
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
    
    // 선택한 날짜를 서버로 보내기
    const selectedDateISO = date.toISOString();
    
    fetchFilteredData(selectedDateISO);
  } else {
    setIsCalendarVisible(false);
  }
};

const fetchFilteredData = async (selectedDate) => {
  try {
    const formattedDate = selectedDate.toISOString(); // 선택한 날짜를 ISO 형식으로 변환
    console.log('날짜',formattedDate)
    const response = await fetch(`${DjangoIP}/home/search/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ date: formattedDate }),
    });

    if (!response.ok) {
      throw new Error('네트워크 오류');
    }

    const filteredData = await response.json();

    if (filteredData.results) {
      setFilteredData(filteredData.results);
    } else {
      setFilteredData([]); // 검색 결과가 없을 때 빈 배열로 설정
    }
  } catch (error) {
    console.error('날짜로 데이터 필터링 요청 에러:', error);
  }
};

const handleSearch = async () => {
  try {

  

    const response = await fetch(`${DjangoIP}/home/search/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ q: searchQuery }),
    });

    if (!response.ok) {
        throw new Error('네트워크 오류');
    }

    const searchData = await response.json();
       if (searchData.results) {
      let sortedSearchData = [...searchData.results]; // 검색 결과를 복사

      // 오름차순 또는 내림차순으로 정렬
      if (!sortAscending) {
        sortedSearchData.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA; // 내림차순 정렬
        });
      } else {
        sortedSearchData.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateA - dateB; // 오름차순 정렬
        });
      }

      setFilteredData(sortedSearchData);
        } else {
          setFilteredData([]);
        }
        } catch (error) {
        console.error('검색 요청 에러:', error);
        }
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

const renderItem = ({item}) => {
    const date = new Date(item.created_at);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `Date: ${year}-${month}-${day} ${hours}:${minutes}`;

return (
    <TouchableOpacity
    style={styles.magazineItem}
    onPress={() => handleResult(item)}>
    <View style={styles.imageContainer}>
        <Image source={{ uri: getImage(item.history_img) }} style={styles.image} />
        <Text style={styles.smallTitle}>{item.name}</Text>
        <View style={styles.dateContainer}>
        <View style={styles.dateBackground}></View>
        <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        <TouchableOpacity onPress={() => handleBookmarkAndUpdateData(item)}>
        <Icon
            name={item.bookmarked ? 'bookmark' : 'bookmark-border'}
            size={40}
            color={item.bookmarked ? 'blue' : 'gray'}
        />
        </TouchableOpacity>
    </View>
    </TouchableOpacity>
);
};
return (
    <Tab.Navigator>
      <Tab.Screen name="Result">
        {() => (
          <View style={styles.container}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="제목으로 검색"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
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
               data={filteredData.length > 0 ? filteredData : sortedData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            {isCalendarVisible && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="calendar"
              onChange={handleDateSelect}
            />
            )}
          </View>
        )}
      </Tab.Screen>
      <Tab.Screen name="MyBookmark" options={{ tabBarLabel: '북마크' }} initialParams={{ token: token, email}}>
        {() => (
          <View style={styles.container}>
            <FlatList
              data={bookmarkedRecords}
              renderItem={renderItem}
              keyExtractor={(item) =>  item.id.toString()}
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
