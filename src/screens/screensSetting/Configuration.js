import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PrivacyPolicy = () => {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };

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
                <Text style={styles.title}>계정 확인</Text>
                <Text style={styles.content}>
                App Version: vol.0.9
                {"\n"}
                Platform: Android Only
                </Text>
            </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5EFDF',
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
    content: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default PrivacyPolicy;
