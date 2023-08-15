import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Result from './screensPhoto/Result';

const Camera = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const openCamera = () => {
        launchCamera({ mediaType: 'photo' }, response => {
            if (!response.didCancel) {
                setSelectedImage(response.uri);
                setShowPopup(true);
            }
        });
    };

    const openGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (!response.didCancel) {
                setSelectedImage(response.uri);
                setShowPopup(true);
            }
        });
    };

    const handleDiagnose = () => {
        setShowPopup(false);
        navigation.navigate('Past_Result', { selectedImage });
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
                keyExtractor={item => item.key}
                contentContainerStyle={styles.buttonContainer}
            />
            {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.image} />
            )}
            {showPopup && (
                <View style={styles.popup}>
                    <Text style={styles.popupText}>식물의 상태를{"\n"}진단하시겠습니까?</Text>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                    )}
                    <View style={styles.popupButtons}>
                        <TouchableOpacity style={styles.popupButton} onPress={handleDiagnose}>
                            <Text>확인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.popupButton}
                            onPress={() => setShowPopup(false)}
                        >
                            <Text>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
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
    buttonTitle:{
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
        width: 200,
    },
    popupButtons: {
        flexDirection: 'row',
        marginTop: 20,
        marginVertical: 10,
    },
    popupButton: {
        backgroundColor: '#8CB972',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    popupText: {
        color: 'gray',
    },
    selectedImage: {
        width: 150,
        height: 150,
        marginVertical: 10,
    },
});

export default Camera;
