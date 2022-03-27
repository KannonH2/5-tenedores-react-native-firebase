import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from "react-native-easy-toast";
import Loading from '../../components/Loading'
import AddRestaurantForm from '../../components/Restaurants/AddRestaurantForm'

export default function AddRestaurant (props) {
    const { navigation } = props
    const toastRef = useRef()
    const [isLoading, setIsLoading] = useState(false)


  return (
    <View style={styles.viewBody}>
        <AddRestaurantForm
            setIsLoading={setIsLoading}
            toastRef={toastRef}
            navigation={navigation}
        />
        <Toast ref={toastRef} position="center" opacity={0.9} />
        <Loading isVisible={isLoading} text="Cargando..." />
    </View>
  )
}


const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})