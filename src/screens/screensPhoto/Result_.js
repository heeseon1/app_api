import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Result_ = ({ route }) => {
    const navigation = useNavigation();
    const { title, image, explanation, date, bookmarked  } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#2D5E40" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <Image source={image} style={styles.image} />
                <Text style={styles.explanation}>{explanation}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.date}>Date: {date}</Text>
                    <View style={styles.bookmarkContainer}>
                        <Text style={styles.bookmarkText}>Bookmarked: </Text>
                        <Icon
                            name={bookmarked ? 'bookmark' : 'bookmark-border'}
                            size={24}
                            color={bookmarked ? 'blue' : 'gray'}
                        />
                    </View>
                </View>
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
        width: 300,
        height: 250,
        alignItems: 'center',
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
        padding: 10,
        width: '100%',
    },
});

export default Result_;
