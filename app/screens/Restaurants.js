import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";


export default function Restaurants() {
    return (
        <View style={styles.container}>
        <Text>Restaurants...</Text>
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
    });