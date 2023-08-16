import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SoftwareLicense = () => {
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
                <Text style={styles.title}>소프트웨어 라이선스</Text>
                <Text style={styles.content}>
                제 1조 (정의){"\n"}
                본 소프트웨어 라이선스(이하 '라이선스')는 [소프트웨어 이름] (이하 '소프트웨어')의 사용 조건과 제한 사항을 규정합니다.{"\n"}
                {"\n"}
                제 2조 (라이선스 부여){"\n"}
                {"\n"}
                1. 소프트웨어의 라이선스는 사용자에게 무상으로 부여되며, 사용자는 소프트웨어를 사용할 수 있는 권한을 얻습니다.{"\n"}
                2. 라이선스는 개인 및 기업을 포함한 모든 사용자에게 부여됩니다.{"\n"}
                {"\n"}
                제 3조 (사용 권한){"\n"}
                {"\n"}
                1. 사용자는 소프트웨어를 개인적인 목적으로 무제한 사용할 수 있습니다.{"\n"}
                2. 사용자는 소프트웨어를 수정, 복제, 배포할 수 있습니다.{"\n"}
                3. 단, 사용자는 소프트웨어를 상업적인 목적으로 사용하거나 판매할 경우 별도의 라이선스 동의를 받아야 합니다.{"\n"}
                {"\n"}
                제 4조 (책임 제한){"\n"}
                {"\n"}
                1. 소프트웨어는 "있는 그대로" 제공되며, 어떠한 경우에도 제작자는 소프트웨어의 정확성, 신뢰성, 완전성 등에 대한 어떠한 책임도 지지 않습니다.{"\n"}
                2. 어떠한 손해도 제작자는 책임을 지지 않습니다.{"\n"}
                {"\n"}
                제 5조 (라이선스의 해지){"\n"}
                {"\n"}
                1. 사용자는 언제든지 라이선스를 해지할 수 있습니다.{"\n"}
                2. 라이선스가 해지된 경우, 사용자는 소프트웨어를 더 이상 사용할 수 없습니다.{"\n"}
                {"\n"}
                제 6조 (변경 및 업데이트){"\n"}
                {"\n"}
                1. 제작자는 소프트웨어의 변경 및 업데이트를 원하는 경우 언제든지 가능하며, 변경된 소프트웨어 역시 해당 라이선스에 따라 제공됩니다.{"\n"}
                제 7조 (분쟁해결){"\n"}
                {"\n"}
                본 라이선스에서 정하지 않은 사항 및 본 라이선스의 해석에 관한 분쟁은 관련 법령에 따라 합의 또는 조정을 시도하며, 해결되지 않는 경우 관할 법원에 소를 제기할 수 있습니다.{"\n"}
                {"\n"}
                이는 간단한 예시일 뿐이며, 실제 소프트웨어의 특성과 목적에 맞게 라이선스를 작성하셔야 합니다. 상세한 내용 및 법적 효력을 확인하기 위해서는 변호사나 전문가와 상담하시기를 권장합니다.
                </Text>
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
    content: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default SoftwareLicense;
