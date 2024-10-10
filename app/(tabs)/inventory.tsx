import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import { Video } from 'expo-av'

import { getInventory } from '../queries'

const { width, height } = Dimensions.get('window')

export default function Inventory() {
    const [isLoading, setLoading] = useState(true)
    const [inventory, setInventory] = useState([])
    const [currentVisibleIndex, setCurrentVisibleIndex] = useState(null)

    const updateInventory = async () => {
        const inventory = await getInventory()
        const filteredInventory = inventory.filter((itemData: any) => itemData.video_hd_url)
        
        setLoading(false)
        setInventory(filteredInventory)
    }

    useEffect(() => {
        updateInventory()
    }, [])

   
    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentVisibleIndex(viewableItems[0].index)
        }
    }).current

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current

    const renderItem = ({ item, index }: any) => {
        return (
            <Video
                source={{ uri: `https://media.purplewave.com/videos/About_Purple_Wave.mp4` }}
                isLooping
                shouldPlay={index === currentVisibleIndex}
                useNativeControls={true}
                style={styles.video}
                onPlaybackStatusUpdate={(status: any) => {}}
            />
        )
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={inventory}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                    snapToInterval={height}
                    decelerationRate="fast"
                    pagingEnabled={true}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    video: {
        width: width,
        height: height,
    },
    flatList: {
        flex: 1,
    },
})
