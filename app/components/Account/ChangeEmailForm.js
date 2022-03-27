import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api";

export default function ChangeEmailFOrm(props) {
  const { email, setShowModal, toastRef, setReloadData } = props;
  const [formData, setFormData] = useState(defaultValue);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  const onSubmit = () => {
    setErrors({});
    if (!formData.email || email === formData.email) {
      setErrors({
        email: "El email no se ah cambiado",
      });
    } else if (!validateEmail(formData.email)) {
      setErrors({
        email: "El email no es valido",
      });
    } else if (formData.password === "") {
      setErrors({
        password: "La contraseña no puede estar vacia",
      });
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(formData.email)
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              toastRef.current.show("Email actualizado correctamente");
              setShowModal(false);
            })
            .catch((err) => {
              setErrors({
                email: "Error al actualizar el email",
              });
              setIsLoading(false);
            });
        })
        .catch((err) => {
          setIsLoading(false);
          setErrors({
            password: "Contraseña Incorrecta",
          });
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nuevo Email"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <View style={styles.btnView}>
        <Button
          title="Cambiar Email"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={onSubmit}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
}

function defaultValue(value) {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
    width: 350,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  btnCancelContainer: {
    marginTop: 20,
    marginBottom: 0,
    marginRight: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnCancel: {
    backgroundColor: "#ccc",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
