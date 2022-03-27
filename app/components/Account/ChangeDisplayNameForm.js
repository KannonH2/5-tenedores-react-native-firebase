import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal, toastRef, setReloadData } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre de usuario es obligatorio");
    } else if (displayName === newDisplayName) {
      setError("El nuevo nombre de usuario es igual al actual");
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: newDisplayName,
        })
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          setShowModal(false);
          toastRef.current.show("Nombre de usuario actualizado", 2000);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y Apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
      />
      <View style={styles.btnView}>
        <Button
          title="Cambiar Nombre"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => {
            onSubmit();
          }}
          loading={isLoading}
        />
      </View>
    </View>
  );
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
