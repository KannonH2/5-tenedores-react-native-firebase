import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/validations";
import Loading from "../../components/Loading";

export default function RegisterForm() {
  const navigation = useNavigation();
  const [showPsw, setShowPsw] = useState(false);
  const [showPswConfirm, setShowPswConfirm] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);

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

  const pswCheck = () =>
    Alert.alert("Contraseña", "Las contraseñas no coinciden", [{ text: "OK" }]);

  const pswSize = () =>
    Alert.alert(
      "Contraseña muy corta",
      "La contraseña debe tener al menos 6 caracteres",
      [{ text: "OK" }]
    );

  const userCreated = () =>
    Alert.alert("Usuario creado", "El usuario ha sido creado con éxito", [
      { text: "OK", onPress: () => navigation.navigate("account") },
    ]);
  const userError = () =>
    Alert.alert("Error", "Error al crear el Usuario", [{ text: "OK" }]);

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.passwordConfirm)
    ) {
      allFields();
    } else if (!validateEmail(formData.email)) {
      emailCheck();
    } else if (formData.password !== formData.passwordConfirm) {
      pswCheck();
    } else if (size(formData.password) < 6) {
      pswSize();
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          userCreated();
        })
        .catch(() => {
          setLoading(false);
          userError();
        });
    }
  };

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Email"
        constainerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        useNativeDriver={true}
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
        constainerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPsw ? false : true}
        onChange={(e) => onChange(e, "password")}
        useNativeDriver={true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPsw ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPsw(!showPsw)}
          />
        }
      />
      <Input
        placeholder="Confirmar Contraseña"
        constainerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPswConfirm ? false : true}
        onChange={(e) => onChange(e, "passwordConfirm")}
        useNativeDriver={true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPswConfirm ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPswConfirm(!showPswConfirm)}
          />
        }
      />
      <Button
        title="Registrarse"
        constainerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando Cuenta" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
    passwordConfirm: "",
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
  btnContainerRegister: {
    marginTop: 30,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
    marginTop: 30,
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
