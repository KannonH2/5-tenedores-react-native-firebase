import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useNavigation } from "@react-navigation/native";
import { InfoForm } from "./InfoForm";
import { UploadImagesForm } from "./UploadImagesForm";
import { ImageRestaurant } from "./ImageRestaurant";
import { db } from "utils/firebase";
import { initialValues, validationSchema } from "./AddRestaurantForm.data";
import { styles } from "./AddRestaurantForm.styles";

export function AddRestaurantForm() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setLoading(true);
        const newData = formValue;
        newData.id = uuid();
        newData.createdAt = new Date();

        await setDoc(doc(db, "restaurants", newData.id), formValue);

        navigation.goBack();
      } catch (error) {
        setLoading(false);
      }
    },
  });

  return (
    <View>
      <ImageRestaurant formik={formik} />

      <InfoForm formik={formik} />

      <UploadImagesForm formik={formik} />

      <Button
        title="Crear restaurante"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={loading}
      />
    </View>
  );
}
