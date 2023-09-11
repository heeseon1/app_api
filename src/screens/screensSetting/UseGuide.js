import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';

import Main from '../Main';
import Result from '../Result';
import Camera from '../Camera';
import Setting from '../Setting';

const UseGuide = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { token, pk, email } = route.params;
    const [popupIndex, setPopupIndex] = useState(0);

    const handleBack = () => {
        navigation.navigate('Home', [token, pk, email]);
    };

    const handleNext = () => {
        setPopupIndex(popupIndex + 1);
    };

    const handlePrevious = () => {
        setPopupIndex(popupIndex - 1);
    };

    const renderPopupContent = () => {
        let popupContent;

        switch (popupIndex) {
        case 0:
            popupContent = (
            <View style={styles.popupContainer}>
                <Text style={styles.popupText}>
                자주 발병하는 병해의 정보를{'\n'}알 수 있고{'\n'}
                나의 지난 결과로{'\n'}
                바로 들어갈 수 있습니다{'\n'}
                </Text>
                <TouchableOpacity
                onPress={handleNext}
                style={styles.arrowContainer}>
                <Icon name="keyboard-arrow-right" color="white" size={40} />
                </TouchableOpacity>
            </View>
            );
            break;
        case 1:
            popupContent = (
            <View style={styles.popupContainer}>
                <Text style={styles.popupText}>
                나의 기록을 제목이나 날짜,{'\n'}
                또는 오름/내림 차순{'\n'}
                검색할 수 있고{'\n'}내 기록 중 북마크한 것은{'\n'}
                하단에 생긴 북마크에서{'\n'}
                찾을 수 있습니다
                </Text>
                <TouchableOpacity
                onPress={handleNext}
                style={styles.arrowContainer}>
                <Icon name="keyboard-arrow-right" color="white" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={handlePrevious}
                style={styles.arrowContainerLeft}>
                <Icon name="keyboard-arrow-left" color="white" size={40} />
                </TouchableOpacity>
            </View>
            );
            break;
        case 2:
            popupContent = (
            <View style={styles.popupContainer}>
                <Text style={styles.popupText}>
                카메라나 갤러리의 사진을{'\n'}
                진단할 수 있습니다
                </Text>
                <TouchableOpacity
                onPress={handleNext}
                style={styles.arrowContainer}>
                <Icon name="keyboard-arrow-right" color="white" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={handlePrevious}
                style={styles.arrowContainerLeft}>
                <Icon name="keyboard-arrow-left" color="white" size={40} />
                </TouchableOpacity>
            </View>
            );
            break;
        case 3:
            popupContent = (
            <View style={styles.popupContainer}>
                <Text style={styles.popupText}>
                메뉴의 기능을{'\n'}
                모두 사용할 수 있습니다{'\n'}
                궁금한 점이나 문제 또는{'\n'}
                이의가 있으신 분들은{'\n'}
                문의 바랍니다
                </Text>
                <TouchableOpacity
                onPress={handlePrevious}
                style={styles.arrowContainerLeft}>
                <Icon name="keyboard-arrow-left" color="white" size={40} />
                </TouchableOpacity>
            </View>
            );
            break;
        }

        return popupContent;
    };

    return (
        <View style={styles.container}>
        {/* 배경 화면 */}
        {popupIndex === 0 && <Main />}
        {popupIndex === 1 && <Result />}
        {popupIndex === 2 && <Camera />}
        {popupIndex === 3 && <Setting />}

        {/* 투명한 팝업 */}
        {popupIndex >= 0 && (
            <View style={styles.popupOverlay}>
            <TouchableOpacity
                onPress={handleBack}
                style={styles.backArrowContainer}>
                <Icon name="close" color="white" size={40} />
            </TouchableOpacity>
            {renderPopupContent()}
            </View>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    popupOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 500,
    },
    popupText: {
        color: 'white',
        fontSize: 18,
        margin: 10,
    },
    arrowContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    arrowContainerLeft: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    backArrowContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
});

export default UseGuide;
