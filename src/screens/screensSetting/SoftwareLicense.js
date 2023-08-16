import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SoftwareLicense = () => {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };

    const licenses = [
        { library: 'React Native', license: 'MIT License' },
        { library: 'React Navigation', license: 'BSD License' },
        { library: 'Redux', license: 'MIT License' },
        { library: 'Axios', license: 'MIT License' },
        { library: 'Lodash', license: 'MIT License' },
        { library: 'AsyncStorage', license: 'Apache License 2.0' },
        // 더 많은 라이브러리 정보 추가
    ];

    return (
        <View style={styles.container}>
            {/* 상단 바 */}
            <View style={styles.header}>
                <Text style={styles.appName}>GreenDan</Text>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Icon name="keyboard-arrow-left" color="black" size={30} />
                </TouchableOpacity>
            </View>

            {/* 이용 약관 내용 */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>소프트웨어 라이선스</Text>
                    {licenses.map((item, index) => (
                        <View key={index} style={styles.licenseItem}>
                            <Text style={styles.library}>{item.library}</Text>
                            <Text style={styles.license}>{item.license}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8CB972',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 5,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginHorizontal: 5,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    licenseItem: {
        flexDirection: 'row',  // 세로 정렬을 위해 가로로 나열
        marginBottom: 10,
    },
    library: {
        flex: 1,  // 공간을 고르게 분할하여 세로 정렬
        fontSize: 18,
        fontWeight: 'bold',
    },
    license: {
        flex: 1,  // 공간을 고르게 분할하여 세로 정렬
        fontSize: 16,
        color: 'gray',
    },
});

export default SoftwareLicense;
