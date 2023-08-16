import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Configuration = () => {
    const navigation = useNavigation();
    const [notificationEnabled, setNotificationEnabled] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const toggleNotification = () => {
        setNotificationEnabled(!notificationEnabled);
    };

    const openAppInfo = () => {
        setModalVisible(true);
    };

    const data = [
        { id: 'notification', label: 'Receive Notifications:', switch: true },
        { id: 'info', label: '계정 확인' }
    ];

    const renderItem = ({ item }) => {
        if (item.id === 'notification') {
            return (
                <View style={styles.notificationContainer}>
                    <Text style={styles.notificationLabel}>{item.label}</Text>
                    <Switch
                        value={notificationEnabled}
                        onValueChange={toggleNotification}
                    />
                </View>
            );
        } else if (item.id === 'info') {
            return (
                <TouchableOpacity style={styles.infoButton} onPress={openAppInfo}>
                    <Text style={styles.infoButtonText}>{item.label}</Text>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#2D5E40" />
            </TouchableOpacity>
            <Text style={styles.appName}>My App</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
            <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>계정 확인</Text>
                    <Text style={styles.modalText}>App Version: vol.0.5</Text>
                    <Text style={styles.modalText}>Platform: Android Only</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E6F5DD',
    },
    backButton: {
        position: 'absolute',
        top: 25,
        zIndex: 1,
        right: 30,
    },
    appName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2D5E40',
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    notificationLabel: {
        fontSize: 18,
        marginRight: 10,
        color: '#2D5E40',
    },
    infoButton: {
        backgroundColor: '#8CB972',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    infoButtonText: {
        fontSize: 18,
        color: 'white',
    },
    list: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: '#8CB972',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonText: {
        fontSize: 18,
        color: 'white',
    },
});

export default Configuration;
