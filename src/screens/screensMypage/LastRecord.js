import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const LastRecord = ({ route }) => {
    const { filteredData } = route.params;

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.explanation}>{item.explanation}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {filteredData && filteredData.length > 0 ? (
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            ) : (
                <Text style={styles.emptyMessage}>No matching records.</Text>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    explanation: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    emptyMessage: {
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default LastRecord;
