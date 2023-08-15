import {  View, StyleSheet} from "react-native";
import { StatusBar } from "react-native";
import * as React from 'react';
import "react-native-gesture-handler";



const App = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <TestAvoid />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default App;