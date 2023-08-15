import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const termsData = [
    {
        id: "term1",
        title: "이용약관",
        content: "이용약관 내용...",
        screenName: "TermsOfUse", // 해당 약관 화면 이름
    },
    {
        id: "term2",
        title: "개인정보 활용방침",
        content: "개인정보 활용방침 내용...",
        screenName: "PrivacyPolicy", // 해당 약관 화면 이름
    },
    {
        id: "term3",
        title: "소프트웨어 라이선스",
        content: "소프트웨어 라이선스 내용...",
        screenName: "SoftwareLicense", // 해당 약관 화면 이름
    },
];

const TermsScreen = () => {
    const [isAllAgreed, setIsAllAgreed] = useState(false);
    const [termAgreements, setTermAgreements] = useState(
        termsData.map(() => false)
    );

    const hanndleAgreeAll = () => {
        setIsAllAgreed(!isAllAgreed);
        setTermAgreements(termAgreements.map(() => !isAllAgreed));
    };

    const isSignUpEnabled = termAgreements.every((agreed) => agreed);

    const navigation = useNavigation();

    const handleTerms = () => {
        if (isSignUpEnabled) {
            console.log("필수 약관에 모두 동의하였습니다.");
            navigation.navigate("SignUp");
        } else {
            Alert.alert("약관 동의 필요", "동의되지 않은 약관이 있습니다.", [{ text: "확인" }]);
        }
    };
    
    const renderItem = ({ item, index }) => (
        <View style={styles.termContainer}>
            <TouchableOpacity
                style={[styles.term, termAgreements[index] && styles.agreed]}
                onPress={() => {
                    const newTermAgreements = [...termAgreements];
                    newTermAgreements[index] = !newTermAgreements[index];
                    setTermAgreements(newTermAgreements);
                }}
            >
                <Text>{item.title}에 동의합니다</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.detailIcon}
                onPress={() => navigation.navigate(item.screenName)}
            >
                <Icon name="info" size={20} color="#333" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>이용약관 동의</Text>
            <FlatList
                data={termsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.termsContainer}
            />

            <View style={styles.agreeAllContainer}>
                <TouchableOpacity onPress={hanndleAgreeAll}>
                    <Text style={styles.agreeAllText}>
                        모든 약관에 {isAllAgreed ? "동의함" : "동의하지 않음"}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[
                    styles.signUpButton,
                    isSignUpEnabled ? styles.enabled : styles.disabled,
                ]}
                onPress={handleTerms}
            >
                <Text style={styles.signUpButtonText}>가입하기</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#8CB972",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    termsContainer: {
        marginBottom: 20,
        width: "100%",
    },
    termContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    term: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        flex: 1,
    },
    agreed: {
        backgroundColor: "#E5EFDF", // 동의한 약관 스타일
    },
    detailIcon: {
        padding: 10,
    },
    agreeAllContainer: {
        marginBottom: 20,
    },
    agreeAllText: {
        textDecorationLine: "underline",
    },
    signUpButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    signUpButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    enabled: {
        opacity: 1,
    },
    disabled: {
        opacity: 0.6,
    },
});

export default TermsScreen;
