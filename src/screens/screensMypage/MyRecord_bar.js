import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyBookmark from './MyBookmark';
import LastRecord from './LastRecord';
import Result from '../screensPhoto/Result';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Tab = createMaterialTopTabNavigator();

const MyRecord_bar = () => {
    const [searchText, setSearchText] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isLatestOrder, setIsLatestOrder] = useState(true);

    const handleSearch = (item) => {
        return item.title.toLowerCase().includes(searchText.toLowerCase());
    };

    const handleDateSelect = (date) => {
        setDatePickerVisibility(false);
        setSelectedDate(date);
    };

    const handleConfirmDate = (date) => {
        handleDateSelect(date);
    };

    const handleCancelDate = () => {
        setDatePickerVisibility(false);
    };

    const handleToggleOrder = () => {
        setIsLatestOrder((prevOrder) => !prevOrder);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="검색..."
                    placeholderTextColor="#8CB972"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <TouchableOpacity onPress={handleToggleOrder}>
                    <Icon name={isLatestOrder ? "sort-amount-desc" : "sort-amount-asc"} size={30} margin={15} color="#538454" />
                </TouchableOpacity>   
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                    <Icon name="calendar" size={30 } color="#538454" />
                </TouchableOpacity>
            </View>
            <Tab.Navigator>
                <Tab.Screen
                    name="Result"
                    component={Result}
                    initialParams={{
                        dataFilter: handleSearch,
                        selectedDate: selectedDate,
                        latestOrder: isLatestOrder,
                    }}
                    options={{ tabBarLabel: '모든 기록' }}
                />
                <Tab.Screen
                    name="Last Record"
                    component={LastRecord}
                    initialParams={{
                        dataFilter: handleSearch,
                        selectedDate: selectedDate,
                        latestOrder: isLatestOrder,
                    }}
                    options={{ tabBarLabel: '검색 기록' }}
                />
            </Tab.Navigator>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={handleCancelDate}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#8CB972',
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E5EFDF',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: '#E5EFDF',
    },
});

export default MyRecord_bar;