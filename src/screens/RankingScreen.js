import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { map } from "lodash";
import { RestaurantRanking } from "components";
import { db } from "utils";

export function RankingScreen() {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("ratingMedia", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  return (
    <ScrollView>
      {map(restaurants, (restaurant, index) => (
        <RestaurantRanking
          key={restaurant.id}
          index={index}
          restaurant={restaurant.data()}
        />
      ))}
    </ScrollView>
  );
}
