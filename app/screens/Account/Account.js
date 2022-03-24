import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import * as firebase from "firebase";
import GuestUser from "./GuestUser";
import LoggedUser from "./LoggedUser";
import Loading from "../../components/Loading";

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);
  

  if (login === null) return <Loading isVisible={true} text="Cargando..."/>;

  return login ? <LoggedUser /> : <GuestUser />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
