import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';


const Past_Result = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { token, email, result } = route.params;
    const [currentResult, setCurrentResult] = useState(result);
    

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            setCurrentResult(null);
        });

        return unsubscribe;
    }, [navigation]);
    

    console.log('넘겨받은 화면:', currentResult)

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home', {token, email})}>
                <Icon name="arrow-back" size={30} color="#8CB972" />
            </TouchableOpacity>
            <Text style={styles.title}>식물 진단 결과</Text>
            {currentResult &&(
            <View>
            <Image source={{ uri: `data:image/jpeg;base64, ${currentResult.result.ai_images[0]}` }} style={styles.image} />
            <Text style={styles.datetime}>{currentResult.datetime}</Text>
            <Text style={styles.description}>{currentResult.result.ai_name}</Text>
            </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#E5EFDF',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        color: '#2D5E40',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 250,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    datetime: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    description: {
        margin: 20,
        fontSize: 16,
        textAlign: 'left',
        color: '#333',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#8CB972',
        alignItems: 'center',
        padding: 30,
        width: 300,
    },
});

export default Past_Result;


