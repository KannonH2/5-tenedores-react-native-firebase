import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { Loading, Carousel } from "components";
import {
  Header,
  Info,
  BtnReviewForm,
  Reviews,
  BtnFavorite,
} from "components/Restaurant";
import { db } from "utils";
import { styles } from "./RestaurantScreen.styles";

const { width } = Dimensions.get("window");

export function RestaurantScreen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [route.params.id]);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", route.params.id),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });
  }, [route.params.id]);

  if (!restaurant) return <Loading show={true} text="Cargando restaurante" />;

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={restaurant.images} height={250} width={width} />
      <Header restaurant={restaurant} reviews={reviews} />
      <Info restaurant={restaurant} />
      <BtnReviewForm idRestaurant={restaurant.id} />

      <Reviews reviews={reviews} />

      <BtnFavorite idRestaurant={restaurant.id} />
    </ScrollView>
  );
}
