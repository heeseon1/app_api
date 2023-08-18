import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TermsOfUse = () => {
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
                <Text style={styles.title}>이용 약관</Text>
                <Text style={styles.content}>
                제 1조 (목적){"\n"}
                본 약관은 [앱 이름] (이하 '앱')의 서비스 이용 조건 및 {"\n"}
                절차, 회원과 앱 운영자의 권리, 의무, 책임 등을 규정함을 목적으로 합니다.{"\n"}
                {"\n"}
                제 2조 (약관의 효력 및 변경){"\n"}
                1. 본 약관은 앱에 게시함으로써 효력을 발생합니다.{"\n"}
                2. 앱은 필요한 경우 본 약관을 변경할 수 있으며,{"\n"}
                변경된 약관은 게시함으로써 효력을 발생합니다.{"\n"}
                {"\n"}
                제 3조 (서비스의 제공 및 변경){"\n"}
                1. 앱은 회원에게 [서비스 내용] 등을 제공합니다.{"\n"}
                2. 앱은 서비스의 일부 또는 전부를 변경, {"\n"}
                중단할 수 있으며, 이에 대하여 회원에게 사전 공지합니다.{"\n"}
                {"\n"}
                제 4조 (회원가입){"\n"}
                1. 회원가입은 앱의 회원가입 양식을 작성하여 신청하며,{"\n"}
                이에 대한 승낙 여부는 앱 운영자의 판단에 따릅니다.{"\n"}
                2. 회원은 본인의 개인정보를 정확하게 기재하여야 하며,{"\n"}
                기재한 정보의 변경이 있는 경우 즉시 앱에 통지하여야 합니다.{"\n"}
                {"\n"}
                제 5조 (회원의 의무){"\n"}
                1. 회원은 본 약관 및 관련 법령을 준수하여야 하며,{"\n"}
                다음 각 호의 행위를 해서는 안됩니다.{"\n"}
                가. 타인의 개인정보를 도용하거나 부정하게 사용하는 행위{"\n"}
                나. 앱의 운영을 방해하거나 앱의 서비스를 부정한 목적으로 이용하는 행위{"\n"}
                2. 회원은 자신의 계정 및 비밀번호를 관리하고 보호하여야 하며,{"\n"}
                이에 대한 모든 책임은 회원 본인에게 있습니다.{"\n"}
                {"\n"}
                제 6조 (약관 위반시 조치){"\n"}
                1. 앱은 회원이 본 약관을 위반한 경우 경고,{"\n"}
                일시정지, 영구정지 등의 조치를 취할 수 있습니다.{"\n"}
                2. 회원은 앱의 조치에 대하여 이의가 있는 경우 이의를 제기할 수 있으며,{"\n"}
                앱은 이에 대한 조사 및 판단을 합니다.{"\n"}
                {"\n"}
                제 7조 (책임의 한계){"\n"}
                1. 앱은 회원간 또는 회원과 제3자 간의 거래와 관련하여 어떠한 책임도 지지 않습니다.{"\n"}
                2. 회원이 앱의 서비스를 이용하여 발생하는 손해에 대하여 앱은 일체의 책임을 지지 않습니다.{"\n"}
                {"\n"}
                제 8조 (분쟁해결){"\n"}
                본 약관에서 정하지 않은 사항 및 본 약관의 해석에 관한 분쟁은 관련 법령에 따라 합의 또는 조정을 시도하며, 해결되지 않는 경우 관할 법원에 소를 제기할 수 있습니다.{"\n"}
                {"\n"}
                이는 단순한 예시일 뿐이며, 실제 상황과 앱의 특성에 맞게 약관을 작성하셔야 합니다. 상세한 내용 및 법적 효력을 확인하기 위해서는 변호사나 전문가와 상담하시기를 권장합니다.
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

export default TermsOfUse;
