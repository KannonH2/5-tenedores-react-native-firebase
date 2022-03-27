import React from "react";
import { StyleSheet, View, Text, Touchable } from "react-native";
import { Overlay, Button } from "react-native-elements";

export default function Modal(props) {
  const { isVisible, setIsVisible, children } = props;

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <View>
      <Overlay
        isVisible={isVisible}
        fullScreen={false}
        windowBackgroundColor="rgba(0, 0, 0, .5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlay}
        onBackdropPress={() => closeModal()}
      >
        <Text style={styles.modalText}>{children}</Text>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "95%",
    backgroundColor: "#fff",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  modalButton: {
    marginTop: 20,
  },
});
