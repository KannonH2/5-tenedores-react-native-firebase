import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Rating } from "react-native-elements";
import { mean, map, size } from "lodash";
import { styles } from "./Header.styles";

export function Header(props) {
  const { restaurant, reviews } = props;
  const [media, setMedia] = useState(0);

  useEffect(() => {
    if (reviews) {
      const arrayStars = map(reviews, (review) => review.data().rating);
      if (size(arrayStars) > 0) {
        setMedia(mean(arrayStars));
      }
    }
  }, [reviews]);

  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Rating imageSize={20} readonly startingValue={media} />
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
}
