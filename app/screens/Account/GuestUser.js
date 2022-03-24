import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function GuestUser() {

    const navigation = useNavigation();


  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/user-guest.jpg")}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.title}>Consulta tu perfil de 5 Tenedores</Text>
      <Text style={styles.description}>
        ¿Eres un restaurante nuevo en la ciudad? ¿Tienes una idea genial? ¡Sé
        parte de la comunidad de 5 Tenedores!
      </Text>
        <View style={styles.viewBtn}>
            <Button
                title="Ver tu perfil"
                buttonStyle={styles.btnStyle}
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("login")}
            />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  logo: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
    viewBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    btnStyle: {
        backgroundColor: "#00a680",
    },
    btnContainer: {
        width: "70%",
    },
});