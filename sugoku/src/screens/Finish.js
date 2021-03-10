import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function Finish (props) {

  const navigation = props.navigation

  function backHome () {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Congratulation!</Text>
      <Text style={styles.text}>You Complete The Board!</Text>
      <Text style={styles.text}>Thanks For Playing</Text>
      <View style={{ marginHorizontal: 35, marginTop: 20 }}>
        <Button 
          title="Back Home"
          onPress={backHome}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    marginTop: 200
  },
  text: {
    textAlign: 'center'
  }
})