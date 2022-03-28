import React, { useState } from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import CarouselSnap, { Pagination } from "react-native-snap-carousel";
import { styles } from "./Carousel.styles";

export function Carousel(props) {
  const { arrayImages, height, width, hideDots } = props;
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(arrayImages)}
        activeDotIndex={activeDotIndex}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout={"default"}
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />
      {!hideDots && pagination()}
    </View>
  );
}
