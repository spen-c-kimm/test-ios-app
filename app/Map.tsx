import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import { Text, View, StyleSheet, Image  } from 'react-native'

import { getNearestInventory } from './queries'

const CustomMarker = ({ coordinate, image, title, description }: any) => (
  <Marker coordinate={coordinate}>
    <View style={styles.customMarkerContainer}>
      <Image source={image} style={styles.customMarkerImage} />
      {/* <View style={styles.markerLabelContainer}>
        <Text style={styles.markerTitle}>{title}</Text>
        <Text style={styles.markerDescription}>{description}</Text>
      </View> */}
    </View>
  </Marker>
)

export default function Map() {
  const [coordinates, setCoordinates] = useState<any>()
  const [inventory, setInventory] = useState<any>([])

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({})
        const { latitude, longitude } = currentLocation.coords
        const nearestInventory = await getNearestInventory(latitude, longitude)

        setCoordinates({ latitude, longitude })
        setInventory(nearestInventory)
      }
    }

    getLocation()
  }, [])

  return inventory?.length && coordinates ? 
  <MapView
       style={styles.map}
       region={{
         latitude: coordinates.latitude,
         longitude: coordinates.longitude,
         latitudeDelta: 1,
         longitudeDelta: 1,
       }}
     >
      {inventory.map((itemData: any, i: number) => <CustomMarker
      key={i}
            coordinate={{ latitude: itemData.latitude, longitude: itemData.longitude }}
            image={{ uri: `${itemData.image_url}/${itemData.image}` }}
            title={itemData.first_line_description}
            description="This is a pin description."
          />)}
      
     </MapView> : null
}

const styles = StyleSheet.create({
  map: {
    height: 400,
    // ...StyleSheet.absoluteFillObject,
  },
    
    customMarkerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    customMarkerImage: {
      width: 40, // Customize the width
      height: 40, // Customize the height
      resizeMode: 'contain', // Ensures the image scales properly
    },
    markerLabelContainer: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 5,
      alignItems: 'center',
    },
    markerTitle: {
      fontWeight: 'bold',
    },
    markerDescription: {
      fontSize: 12,
    },
})
