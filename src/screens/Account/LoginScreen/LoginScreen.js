import React from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LoginForm } from "components";
import { screen } from "utils";
import { styles } from "./LoginScreen.styles";

export function LoginScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm />

        <Text style={styles.textRegister}>
          ¿Aún no tienes una cuenta?{" "}
          <Text
            style={styles.btnRegister}
            onPress={() => navigation.navigate(screen.account.register)}
          >
            Regístrate
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
