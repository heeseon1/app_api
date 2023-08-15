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
                <Text style={styles.title}>개인정보 활용방침</Text>
                <Text style={styles.content}>
                제 1조 (목적){"\n"}
                본 개인정보 활용방침은 [앱 이름] (이하 '앱')이 회원의 개인정보를 어떻게 수집, 이용, 보관하고 관리하는지에 대한 내용을 규정함을 목적으로 합니다.{"\n"}
                {"\n"}
                제 2조 (수집하는 개인정보의 항목){"\n"}
                앱은 다음과 같은 개인정보를 수집할 수 있습니다.{"\n"}
                {"\n"}
                1. 회원 가입 시: 이름, 이메일 주소, 연락처 등{"\n"}
                2. 서비스 이용 시: 이용 기록, 접속 로그 등{"\n"}
                {"\n"}
                제 3조 (개인정보의 수집 및 이용목적){"\n"}
                앱은 회원의 개인정보를 다음과 같은 목적으로 수집 및 이용할 수 있습니다.{"\n"}
                {"\n"}
                1. 회원 관리 및 서비스 제공을 위한 정보 수집{"\n"}
                2. 서비스 이용 기록을 분석하여 서비스 개선 및 운영 방침 수립을 위한 통계자료로 활용{"\n"}
                {"\n"}
                제 4조 (개인정보의 보유 및 이용기간){"\n"}
                회원의 개인정보는 서비스 제공 목적을 위해 필요한 기간 동안에 한하여 보유 및 이용됩니다.{"\n"}
                그리고 해당 기간이 종료된 후에는 지체 없이 파기됩니다.{"\n"}
                {"\n"}
                제 5조 (개인정보의 제3자 제공){"\n"}
                앱은 회원의 동의 없이 회원의 개인정보를 외부에 제공하지 않습니다.다만, 관련 법령에 따라 개인정보 제공이 필요한 경우 별도의 동의를 받거나 법령에 따라 제공할 수 있습니다.
                {"\n"}
                제 6조 (회원의 권리){"\n"}
                회원은 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다. 또한 개인정보의 처리에 동의하지 않는 경우 회원가입을 거부할 수 있습니다.{"\n"}
                {"\n"}
                제 7조 (개인정보의 안전성 확보 조치){"\n"}
                앱은 회원의 개인정보를 보호하기 위해 보안 시스템을 구축하고 개인정보 처리 직원을 최소한으로 제한하여 관리합니다.{"\n"}
                {"\n"}
                제 8조 (분쟁해결){"\n"}
                본 개인정보 활용방침에서 정하지 않은 사항 및 본 개인정보 활용방침의 해석에 관한 분쟁은 관련 법령에 따라 합의 또는 조정을 시도하며, 해결되지 않는 경우 관할 법원에 소를 제기할 수 있습니다.{"\n"}
                {"\n"}
                이는 단순한 예시일 뿐이며, 실제 상황과 앱의 특성에 맞게 개인정보 활용방침을 작성하셔야 합니다. 상세한 내용 및 법적 효력을 확인하기 위해서는 변호사나 전문가와 상담하시기를 권장합니다.
                </Text>
            </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D5E40',
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
