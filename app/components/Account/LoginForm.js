import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/validations";
import Loading from "../../components/Loading";

export default function LoginForm() {
  const [showPsw, setShowPsw] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const allFields = () =>
    Alert.alert(
      "Llenar todos los campos",
      "Debes llenar todos los campos para poder continuar",
      [{ text: "OK" }]
    );
  const emailCheck = () =>
    Alert.alert("Email incorrecto", "El email ingresado no es correcto", [
      { text: "OK" },
    ]);

  const userLoginError = () =>
    Alert.alert("Error", "Error al Iniciar Sesión", [{ text: "OK" }]);

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      allFields();
    } else if (!validateEmail(formData.email)) {
      emailCheck();
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setLoading(false);
          userLoginError();
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Email"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPsw ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPsw ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPsw(!showPsw)}
          />
        }
      />
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        titleStyle={styles.btnTitle}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Iniciando Sesión" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
  btnTitle: {
    color: "#fff",
  },
});
