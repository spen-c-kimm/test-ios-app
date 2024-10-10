import { Text, View, ImageBackground, StyleSheet, ScrollView  } from 'react-native'

import Map from '../Map'

const categories = [
  {
    label: 'Tractors',
    source: { uri: 'https://d323w7klwy72q3.cloudfront.net/i/a/2024/20241022govt/DH1351.JPG' }
  },
  {
    label: 'Harvesters',
    source: { uri: 'https://d323w7klwy72q3.cloudfront.net/i/a/2024/20241023ag/DR2594.JPG' }
  },
  {
    label: 'Dozers',
    source: { uri: 'https://d323w7klwy72q3.cloudfront.net/i/a/2024/20241015precision/EG9856.JPG' }
  },
  {
    label: 'Loaders',
    source: { uri: 'https://d323w7klwy72q3.cloudfront.net/i/a/2024/20241015precision/EG9861.JPG' }
  },
  {
    label: 'Trucks',
    source: { uri: 'https://d323w7klwy72q3.cloudfront.net/i/a/2024/20241010truck/LR9472.JPG' }
  },
  {
    label: 'Vehicles',
    source: { uri: 'https://d323w7klwy72q3.cloudfront.net/i/a/2024/20241030ve/EG6743.JPG' }
  },
  {
    label: 'Skid Steers',
    source: { uri: 'https://d323w7klwy72q3.cloudfront.net/i/a/2024/20241031const/DV5950.JPG' }
  },
  {
    label: 'Cranes',
    source: { uri: 'https://d323w7klwy72q3.cloudfront.net/i/a/2024/20241008govt/NX9104.JPG' }
  },
  {
    label: 'Boats',
    source: { uri: 'https://d323w7klwy72q3.cloudfront.net/i/a/2021/20210728ve/HT9321E.JPG' }
  },
  {
    label: 'Aircraft',
    source: { uri: 'https://d323w7klwy72q3.cloudfront.net/i/a/2022/20220726govt/DS7109.JPG' }
  },
]

const chunkArray = (arr: any) => {
  return arr.reduce((result: any, value: any, index: number) => {
    if (index % 2 === 0) {
      result.push(arr.slice(index, index + 2))
    }

    return result
  }, [])
}

export default function Home() {
  const rows = chunkArray(categories)

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground style={styles.hero} source={{ uri: 'https://purplewave.s3.amazonaws.com/images/about_banner.png' }}>
        </ImageBackground>
        <View style={styles.heading}>
        <Text style={styles.headingText}>Browse Our Inventory</Text>
    </View>
        
    {rows.map((row: any, i: number) => {
      const [category1, category2] = row
      
      return <View style={styles.row} key={i}>
        <View style={styles.imageContainer}>
              <ImageBackground style={styles.category} source={category1.source}>
                <Text style={styles.text}>{category1.label}</Text>
              </ImageBackground>
            </View>
            <View style={styles.imageContainer}>
              <ImageBackground style={styles.category} source={category2.source}>
                <Text style={styles.text}>{category2.label}</Text>
              </ImageBackground>
            </View>
      </View>
    })}
    <View style={styles.heading}>
    <Text style={styles.headingText}>Find Equipment Near You</Text>
    </View>
    <Map />
  </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
        width: '100%',
        gap: 10
    },
    hero: {
      width: '100%',
      height: 200,
    },
    heading: {
      padding: 10,
      backgroundColor: 'rgb(193 176 215)',
      borderRadius: 10
    },
    headingText: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      gap: 10
    },
    imageContainer: {
      flexGrow: 1,
      borderRadius: 10,
      overflow: 'hidden'
    },
    category: {
      height: 100,
      backgroundColor: 'white',
      position: 'relative'
    },
    text: {
      position: 'absolute',
      top: 10,
      left: 10,
      fontWeight: 'bold',
      color: 'white'
    },
})
