import React from "react";
import { Overlay } from "react-native-elements";
import { styles } from "./Modal.styles";

export function Modal(props) {
  const { show, close, children } = props;

  return (
    <Overlay
      isVisible={show}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={close}
    >
      {children}
    </Overlay>
  );
}
