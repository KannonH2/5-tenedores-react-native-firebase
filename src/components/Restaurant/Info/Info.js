import { View } from "react-native";
import { Text, ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { Map } from "components";
import { styles } from "./Info.styles";

export function Info(props) {
  const { restaurant } = props;

  const listInfo = [
    {
      text: restaurant.address,
      iconType: "material-community",
      iconName: "map-marker",
    },
    {
      text: "111 222 333",
      iconType: "material-community",
      iconName: "phone",
    },
    {
      text: "xAgustin93@gmail.com",
      iconType: "material-community",
      iconName: "at",
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información sobre el restaurante</Text>
      <Map location={restaurant.location} name={restaurant.name} />
      {map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} color="#00a680" />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
