import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { setUsername, setDifficulty } from '../store/action'

export default function Home (props) {

  const navigation = props.navigation
  const dispatch = useDispatch()
  const username = useSelector(state => state.player.username)
  const difficulty = useSelector(state => state.player.difficulty)

  function getName (text) {
    dispatch(setUsername(text))
  }

  function getDifficulty (payload) {
    dispatch(setDifficulty(payload))
  }

  return (
    <View style={{ marginVertical: 100 }}>
      <Text style={{ fontSize: 50, textAlign: 'center', marginBottom: 15 }}>SUGOKU</Text>
      <TextInput 
        style={styles.usernameInput}
        keyboardType= "default"
        placeholder="Enter Username"
        onChangeText={ text => getName(text) }
        maxLength={25}
      />
      
      <View style={styles.difficultyContainer}>
        <Button 
          title="Easy"
          color="#87CEEB"
          onPress={() => getDifficulty('easy')}
        />
        <Button 
          title="Medium"
          color="#48d1cc"
          onPress={() => getDifficulty('medium')}
        />
        <Button 
          title="Hard"
          color="#ff6347"
          onPress={() => getDifficulty('hard')}
        />
      </View>
      { username !== '' ? 
        <View style={[styles.detail]}>
          <View style={styles.textDetail}>
            <Text>Username:</Text>
            <Text>{ username }</Text>
          </View>
          <View style={[styles.textDetail, { marginBottom: 25 }]}>
            <Text>Difficulty:</Text>
            <Text>{ difficulty }</Text>
          </View>
          <Button
            style={styles.playBtn}
            title="Play!"
            onPress={() => navigation.navigate('Board') }
          />
        </View> : <View></View> 
      }
    </View>
  )
}

const styles = StyleSheet.create({
  usernameInput: {
    backgroundColor: '#DCDCDC',
    marginHorizontal: 35,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30
  },
  difBtn: {

  },
  playBtn: {
    borderRadius: 15
  },
  detail: {
    backgroundColor: '#DCDCDC',
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5
  },
  textDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5
  }
})