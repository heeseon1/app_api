import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Result from './Result';

const Camera = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const route = useRoute();
  const { token, email } = route.params;
  console.log('이메일',email);

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel) {
        setSelectedImage(response.uri);
        setShowPopup(true);
      }
    });
  };

  const openGallery = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (!response.didCancel) {
        setSelectedImage(response.uri);
        setShowPopup(true);
      } 

      const formData = new FormData();
      formData.append('user_image', {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      });
      formData.append('email', email);
      console.log('폼데이터:',formData);

      try {
        const djServer = await fetch('http://192.168.200.182:8000/photo/test/', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (djServer.status === 200) {
          const data = await djServer.json();
          setResult(data);
          console.log('데이터 확인:', data);
        } else {
          console.error('사진 업로드 실패');
        }
      } catch (error) {
        console.error('사진 업로드 중 오류:', error);
      }
    });
  };

  const handleDiagnose = () => {
    setIsLoading(true); // 로딩 상태를 true로 변경

    // 가상의 로딩 시간을 지연시킴 (실제 작업이 여기에 와야 함)
    setTimeout(() => {
      setIsLoading(false);
      setShowPopup(false);
      navigation.navigate('Past_Result', { token, email, result });
    }, 2000); // 2초
    // 실제 작업 코드는 여기에 작성되어야 함
  };

  const buttons = [
    { key: 'camera', title: '카메라', onPress: openCamera },
    { key: 'gallery', title: '갤러리', onPress: openGallery },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={item.onPress}>
      <Text style={styles.buttonTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.buttonContainer}
      />
      {selectedImage  && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      {showPopup && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>
            식물의 상태를{'\n'}진단하시겠습니까?
          </Text>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          )}
          <View style={styles.popupButtons}>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={handleDiagnose}>
              <Text>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => setShowPopup(false)}>
              <Text>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 로딩 화면 */}
      <Modal visible={isLoading} transparent={true}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8CB972" />
          <Text style={styles.loadingText}>결과를 분석하는 중...</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8CB972',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    margin: 20,
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    color: 'gray',
    width: 300,
    marginBottom: 200,
  },
  popupButtons: {
    flexDirection: 'row',
    marginTop: 20,
    marginVertical: 10,
  },
  popupButton: {
    backgroundColor: '#8CB972',

    borderRadius: 5,
    margin: 5,
    width: 100,
    alignItems: 'center',
  },
  popupText: {
    color: 'gray',
    fontSize: 20,
  },
  selectedImage: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
});

export default Camera;