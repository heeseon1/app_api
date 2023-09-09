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
import {useNavigation} from '@react-navigation/native';
import Result from './Result';

const Main = ({ navigation }) => {
  const [blights, setBlights] = useState([]);

  useEffect(() => {
    fetch('http:/192.168.200.182:8000/home/blight/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 오류');
        }
        return response.json();
      })
      .then((data) => setBlights(data.result))
      .catch((error) => console.error('요청 에러: ', error));
  }, []);

 
  const getImage  = (imagepath) => {
    const navigation = useNavigation();
    console.log(`이미지: ${imagepath}`);

    try {
      return `http://192.168.200.182:8000${imagepath}`;
    } catch (error) {
      console.log('이미지 URL을 가져오는 오류 발생:', error);
    }
  };



  const handleMagazine = item => {
    navigation.navigate('Magazine', {
      title: item.title,
      image: item.image,
      explanation: item.explanation,
    });
  };

  const resultData = [
    
  ];

  const handleRecord = item => {
    navigation.navigate('Result_', {
      title: item.title,
      image: item.image,
      explanation: item.explanation,
      date: item.datetime, // 추가: 날짜 정보 전달
      bookmarked: item.bookmarked, // 추가: 북마크 여부 전달
    });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.magazineItem}
      onPress={() => handleMagazine(item)}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.smallTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const itemRenderer = ({item}) => (
    <TouchableOpacity
      style={styles.magazineItem}
      onPress={() => handleRecord(item)}>
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
        <TouchableOpacity
          onPress={handleRecord}
          style={styles.magazineContainer}>
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
