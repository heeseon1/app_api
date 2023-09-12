import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const Main = ({ navigation }) => {
  const [blights, setBlights] = useState([]);
  const [resultData, setResultData] = useState([]);
  const route = useRoute();

  useEffect(() => {
    fetch('http://172.18.80.87:8000/home/blight/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 오류');
        }
        return response.json();
      })
      .then((data) => setBlights(data.result))
      .catch((error) => console.error('요청 에러: ', error));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const { email } = route.params;
      fetch('http://172.18.80.87:8000/home/history/')
        .then((response) => {
          if (!response.ok) {
            throw new Error('네트워크 오류');
          }
          return response.json();
        })
        .then((data) => {
          if (data.code === 200) {
            const filteredData = data.result.filter((item) => item.email === email);
            setResultData(filteredData);
          } else {
            console.error('데이터 가져오기 실패:', data.message);
          }
        })
        .catch((error) => console.error('요청 에러: ', error));
    }, [route.params])
  );

  const getImage = (imagepath) => {
    try {
      return `http://172.18.80.87:8000${imagepath}`;
    } catch (error) {
      console.log('이미지 URL을 가져오는 오류 발생:', error);
    }
  };

  const handleMagazine = (item) => {
    navigation.navigate('Magazine', {
      title: item.title,
      image: item.image,
      explanation: item.explanation,
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

  const itemRenderer = ({ item }) => {
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
        onPress={() => handleRecord(item)}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: getImage(item.history_img) }} style={styles.image} />
          <Text style={styles.smallTitle}>{item.name}</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateBackground}></View>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleRecord = (item) => {
    navigation.navigate('Result_', {
      title: item.name,
      image: item.history_img,
      explanation: item.causation,
      date: item.created_at,
      bookmarked: item.bookmarked,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>자주 발병하는 병해</Text>
        {blights.map((blight) => (
          <TouchableOpacity
            key={blight.id}
            onPress={() => navigation.navigate('Magazine', { blightId: blight.id })}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: getImage(blight.blight_img) }} style={styles.image} />
              <Text style={styles.smallTitle}>{blight.name}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.container2}>나의 지난 기록</Text>
        <FlatList
          data={resultData}
          renderItem={itemRenderer}
          keyExtractor={(item) => item.id.toString()}
        />
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  dateText: {
    color: 'white',
  },
  scrollViewContent: {
    // 스크롤 뷰 내용 스타일
  },
});

export default Main;
