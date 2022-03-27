import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { size } from "lodash";
import { reauthenticate } from "../../utils/api";

export default function ChangePasswordForm(props) {
  const { password, setShowModal, toastRef, setReloadData } = props;
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [formData, setFormData] = useState(defaultValues());
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  const onSubmit = async () => {
    let isSetError = true;
    let errorsTemp = {};
    setErrors({});
    if (
      !formData.password ||
      !formData.newPassword ||
      !formData.repeatPassword
    ) {
      errorsTemp = {
        password: !formData.password ? "Todos los campos son obligatorios" : "",
        newPassword: !formData.newPassword
          ? "Todos los campos son obligatorios"
          : "",
        repeatPassword: !formData.repeatPassword
          ? "Todos los campos son obligatorios"
          : "",
      };
    } else if (formData.newPassword !== formData.repeatPassword) {
      errorsTemp = {
        newPassword: "Las contraseñas no coinciden",
        repeatPassword: "Las contraseñas no coinciden",
      };
    } else if (formData.password === formData.newPassword) {
      errorsTemp = {
        newPassword: "La nueva contraseña no puede ser igual a la actual",
        repeatPassword: "La nueva contraseña no puede ser igual a la actual",
      };
    } else if (size(formData.newPassword) < 6) {
      errorsTemp = {
        newPassword: "La contraseña debe tener al menos 6 caracteres",
        repeatPassword: "La contraseña debe tener al menos 6 caracteres",
      };
    } else {
      setIsLoading(true);
      await reauthenticate(formData.password)
        .then(async () => {
          await firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
              isSetError = false;
              setIsLoading(false);
              setShowModal(false);
              toastRef.current.show("Contraseña actualizada correctamente");
              firebase.auth().signOut();
            })
            .catch((err) => {
              errorsTemp = {
                other: "Error al actualizar la contraseña",
              };
              setIsLoading(false);
            });
        })
        .catch(() => {
          console.log("error");
          errorsTemp = {
            password: "Contraseña incorrecta",
          };
          setIsLoading(false);
        });
    }

    isSetError && setErrors(errorsTemp);
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword1 ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword1 ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword1(!showPassword1),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword2 ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword2 ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword2(!showPassword2),
        }}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword3 ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword3 ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword3(!showPassword3),
        }}
        onChange={(e) => onChange(e, "repeatPassword")}
        errorMessage={errors.repeatPassword}
      />
      <View style={styles.btnView}>
        <Button
          title="Cambiar contraseña"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={onSubmit}
          isLoading={isLoading}
        />
      </View>
      <Text>{errors.other}</Text>
    </View>
  );
}

function defaultValues() {
  return {
    password: "",
    newPassword: "",
    repeatPassword: "",
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
