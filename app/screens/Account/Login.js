import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/Account/LoginForm";

export default function Account() {
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm />
        <CreateAccount />
      </View>
      <Divider style={styles.divider}/>
      <Text>Social Login</Text>
    </ScrollView>
  );
}

function CreateAccount() {
    
    const navigation = useNavigation();

  return (
    <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta? {" "}
          <Text style={styles.btnRegister} onPress={() => navigation.navigate("register")}>
                Registrarse
          </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
    logo: {
      height: 150,
      width: "100%",
      marginTop: 20,
      marginBottom: 20,
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40,
    },
    textRegister: {
        marginTop: 15,
        marginRight: 10,
        marginLeft: 10,
    },
    btnRegister: {
        color: "#00a680",
        fontWeight: "bold",
        fontSize: 16,
    },
    divider: {
        backgroundColor: "#00a680",
        color: "#00a680",
        margin: 40,
        borderColor: "#00a680",
    },
});
