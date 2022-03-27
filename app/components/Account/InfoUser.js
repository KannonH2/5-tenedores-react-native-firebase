import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
  const {
    userInfo: { uid, displayName, email, photoURL },
    setLoading,
    setLoadingText,
    toastRef,
  } = props;


  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA);
    const resultPermissionCamera = resultPermission.permissions.camera.status;
    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la cámara");
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (result.cancelled) {
      toastRef.current.show("Has cerrado la selección de imagen", 1000);
      return;
    } else {
      uploadImage(result.uri)
        .then(() => {
         toastRef.current.show("Imagen subida correctamente");
          updatePhotoURL(result.uri);
        })
        .catch(() => {
          toastRef.current.show("Error al subir la imagen");
        });
    }
  };

  const uploadImage = async (uri) => {
    setLoadingText("Subiendo imagen...");
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };

  const updatePhotoURL = async () => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (result) => {
        const update = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setLoading(false);
      })
      .catch(() => {
        toastRef.current.show("Error al cambiar la imagen de perfil");
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../../assets/img/avatar-default.jpg")
        }
      >
        {/* <Accessory
          name="camera"
          type="font-awesome"
          color="white"
          size={20}
          onPress={changeAvatar}
        /> */}
      </Avatar>

      <View style={styles.userInfo}>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anonimo"}
        </Text>
        <Text style={styles.userInfoEmail}>
          {email ? email : "Social Login"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#f2f2f2",
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 5,
  },
});
