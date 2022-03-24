import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantsStack  from "./RestaurantsStack";
import FavoritesStacks from "./FavoritesStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import { Icon } from 'react-native-elements'

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants"
        tabBarOptions={{
          inactiveTintColor: '#646464',
          activeTintColor: '#00a680',
          style: {
            height: 80,
        },
          labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}        
      >
        <Tab.Screen
          name="restaurants"
          component={RestaurantsStack}
          options={{ title: "Restaurantes" }}
          titleStyle={{ fontSize: 15 }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesStacks}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="top-restaurants"
          component={TopRestaurantsStack}
          options={{ title: "Top 5" }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "restaurants":
      iconName = "silverware-fork-knife";
      break;
    case "favorites":
      iconName = "heart-outline";
      break;
    case "top-restaurants":
      iconName = "star-outline";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "account":
      iconName = "home-outline";
      break;
  }
  return <Icon type="material-community" name={iconName} size={35} color={color} />;
}

