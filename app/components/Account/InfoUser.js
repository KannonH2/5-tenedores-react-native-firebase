import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, avatar } from "react-native-elements";
//import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
  const {
    userInfo: { displayName, email, photoURL },
  } = props;

  const changeAvatar = () => {
    const resultPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    };
    console.log(resultPermission);
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
      />
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
