import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { map, size, filter } from "lodash";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import uuid from "random-uuid-v4";
import Modal from "../Modal";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const widthScreen = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const db = firebase.firestore(firebaseApp);

export default function AddRestaurantForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantWeb, setRestaurantWeb] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [imageSelected, setImageSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationRestaurant, setLocationRestaurant] = useState(null);

  const AddRestaurant = () => {
    if (
      !restaurantName ||
      !restaurantAddress ||
      !restaurantPhone ||
      !restaurantEmail ||
      !restaurantDescription ||
      !locationRestaurant
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (size(imageSelected) === 0) {
      toastRef.current.show("Debes seleccionar al menos una imagen");
    } else if (!locationRestaurant) {
      toastRef.current.show("Debes seleccionar una ubicación");
    } else {
      setIsLoading(false);
      UploadImageStorage().then((response) => {
        
        db.collection("restaurants")
          .add({
            name: restaurantName,
            address: restaurantAddress,
            phone: restaurantPhone,
            email: restaurantEmail,
            web: restaurantWeb,
            description: restaurantDescription,
            location: locationRestaurant,
            images: response,
            rating: 0,
            ratingTotal: 0,
            ratingCounter: 0,
            createAt: new Date(),
            updateAt: new Date(),
            createdBy: firebase.auth().currentUser.uid,
          })
          .then(() => {
            setIsLoading(false);
            navigation.navigate("restaurants");
          })
          .catch((error) => {
            setIsLoading(false);
            toastRef.current.show("Error al subir el restaurante");
          });
      });
      
    }
  };

  const UploadImageStorage = async () => {
    const imageBlob = [];

    Promise.all(
      map(imageSelected, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const photoId = uuid();
        const ref = firebase.storage().ref("restaurants").child(photoId);

        await ref.put(blob).then(async (result) => {
          await firebase
            .storage()
            .ref(`restaurants/${photoId}`)
            .getDownloadURL()
            .then((response) => {
              imageBlob.push(response);
            });
        });
      })
    );
    return imageBlob;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ImageRestaurant imageRestaurant={imageSelected[0]} />
      <FormAdd
        setRestaurantName={setRestaurantName}
        setRestaurantAddress={setRestaurantAddress}
        setRestaurantPhone={setRestaurantPhone}
        setRestaurantEmail={setRestaurantEmail}
        setRestaurantWeb={setRestaurantWeb}
        setRestaurantDescription={setRestaurantDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationRestaurant={locationRestaurant}
      />
      <Text style={styles.titleImage}>Imágenes del restaurante</Text>
      <Text style={styles.imageWarning}>Sube hasta 10 Imagenes</Text>

      <UploadImage
        toastRef={toastRef}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
      />
      <Button
        title="Agregar"
        buttonStyle={styles.btnAddRestaurant}
        onPress={AddRestaurant}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationRestaurant={setLocationRestaurant}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function ImageRestaurant(props) {
  const { imageRestaurant } = props;
  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          imageRestaurant
            ? { uri: imageRestaurant }
            : require("../../../assets/img/no-image.png")
        }
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}

function FormAdd(props) {
  const {
    setRestaurantName,
    setRestaurantAddress,
    setRestaurantPhone,
    setRestaurantEmail,
    setRestaurantWeb,
    setRestaurantDescription,
    setIsVisibleMap,
    locationRestaurant,
  } = props;

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        containerStyle={styles.input}
        onChange={(e) => setRestaurantName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        onChange={(e) => setRestaurantAddress(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationRestaurant ? "#00a680" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Teléfono"
        containerStyle={styles.input}
        onChange={(e) => setRestaurantPhone(e.nativeEvent.text)}
      />
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        onChange={(e) => setRestaurantEmail(e.nativeEvent.text)}
      />
      <Input
        placeholder="Sitio web"
        containerStyle={styles.input}
        onChange={(e) => setRestaurantWeb(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripción"
        multiline={true}
        containerStyle={styles.textArea}
        onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function Map(props) {
  const { isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef } =
    props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;
      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Debe aceptar los permisos de localización",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationRestaurant(location);
    toastRef.current.show("Localización agregada correctamente", 3000);
    setIsVisibleMap(false);
  };

  return (
    <Modal
      isVisible={isVisibleMap}
      setIsVisible={setIsVisibleMap}
      style={styles.modalView}
    >
      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar ubicación"
            containerStyle={styles.btnSaveLocation}
            buttonStyle={styles.btnSaveLocationStyle}
            onPress={confirmLocation}
          />
          <Button
            title="Cancelar ubicación"
            containerStyle={styles.btnCancelLocation}
            buttonStyle={styles.btnCancelLocationStyle}
            onPress={() => {
              setIsVisibleMap(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

function UploadImage(props) {
  const { toastRef, setImageSelected, imageSelected } = props;

  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
    const resultPermissionsCamera = resultPermissions.permissions.camera.status;
    if (resultPermissionsCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galería",
        2000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galería sin seleccionar ninguna imagen",
          2000
        );
      } else {
        setImageSelected(result.uri);
        setImageSelected([...imageSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estas seguro de eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setImageSelected(
              filter(imageSelected, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImages}>
      {size(imageSelected) < 10 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {map(imageSelected, (imageRestaurant, index) => {
        return (
          <Avatar
            key={index}
            activeOpacity={0.7}
            style={styles.miniatureStyle}
            source={{ uri: imageRestaurant }}
            onPress={() => removeImage(imageRestaurant)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    width: "100%",
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    margin: 0,
    padding: 0,
  },
  btnAddRestaurant: {
    margin: 20,
    backgroundColor: "#00a680",
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    flexWrap: "wrap",
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    height: 70,
    width: 70,
    marginRight: 10,
    marginBottom: 10,
  },
  titleImage: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  imageWarning: {
    marginBottom: 10,
    fontSize: 14,
    textAlign: "center",
  },
  viewPhoto: {
    alignItems: "center",
    marginBottom: 20,
    height: 200,
  },
  modalView: {
    margin: 20,
  },
  mapContainer: {
    width: 450,
    height: 550,
    flex: 1,
    backgroundColor: "#fff",
  },
  mapStyle: {
    width: "100%",
    height: 550,
    flex: 1,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  btnCancelLocation: {
    paddingLeft: 5,
  },
  btnCancelLocationStyle: {
    backgroundColor: "#a60d0d",
  },
  btnSaveLocation: {
    paddingRight: 5,
  },
  btnSaveLocationStyle: {
    backgroundColor: "#00a680",
  },
});
