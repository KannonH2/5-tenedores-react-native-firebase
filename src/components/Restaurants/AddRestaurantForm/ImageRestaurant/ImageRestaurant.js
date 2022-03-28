import React from "react";
import { View, Text } from "react-native";
import { Image } from "react-native-elements";
import { styles } from "./ImageRestaurant.styles";

export function ImageRestaurant(props) {
  const { formik } = props;

  const imageUpload = formik.values.images[0];

  return (
    <View style={styles.contain}>
      <Image
        source={
          imageUpload
            ? { uri: imageUpload }
            : require("../../../../../assets/img/image-not-found.jpg")
        }
        style={styles.image}
      />
    </View>
  );
}
