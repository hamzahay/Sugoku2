import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { fetchBoard, setBoard, setStart, setUsername } from '../store/action'
import Grid from '../components/Grid'
import { autoSolve, checkValidate, setStatus, setM, setS } from '../store/action'

export default function Board (props) {

  const navigation = props.navigation
  const dispatch = useDispatch()
  const board = useSelector(state => state.board.board)
  const initialBoard = useSelector(state => state.board.initialBoard)
  const loading = useSelector(state => state.board.loading)
  const status = useSelector(state => state.board.status)
  const difficulty = useSelector(state => state.player.difficulty)
  const username = useSelector(state => state.player.username)
  const start = useSelector(state => state.board.start)
  const timerS = useSelector(state => state.timer.s)
  const timerM = useSelector(state => state.timer.m)
  const [mount, setMount] = useState(false)
  const [s, setSs] = useState(0)
  let interval

  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, [])

  useEffect(() => {
    if (mount) {
      if (status == "solved") {
        navigation.push('Finish')
      }
      setTimeout(() => {
        dispatch(setStatus(''))
        setMount(false)
      }, 2000)
    }
    setMount(true)
  }, [status])

  useEffect(() => {
    console.log(start)
    if (start) {
      interval = setInterval(() => {
        console.log('timer', timerM, s)
        // timer macet gk bisa update
        if (s < 59) {
          const newS = s + 1
          console.log(newS)
          setSs(newS)
        } else {
          dispatch(setS(0))
          dispatch(setM(timerM + 1))
        }
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [start])

  function handleText (text, idx, index) {
    let newBoard = [ ...board]
    newBoard[idx][index] = text
    dispatch(setBoard(newBoard))
  }

  function solve () {
    const data = { board: initialBoard }
    dispatch(autoSolve(data))
  }

  function validate () {
    const data = { board: board }
    dispatch(checkValidate(data))
  }

  function giveUp () {
    console.log('giveUp')
    clearInterval(interval)
    dispatch(setStart(false))
    dispatch(setStatus(''))
    dispatch(setUsername(''))
    navigation.navigate('Home')
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff"/>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.top}>{ status }</Text>
        { board.map((line, idx) => 
          <View key={idx} style={[
            styles.line,
            (idx === 2 || idx === 5) ? styles.bottom : null
          ]}>
          {  line.map((el, index) => 
            <Grid
              key={index}
              idx={ idx }
              index={ index }
              handleText={ handleText }
              grid={ el }
            />
            )}
          </View>
        ) }
        <View style={styles.timer}>
          <Text style={{ textAlign: 'center'}}></Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title="auto solve"
            onPress={solve}
          />
          <Button 
            title="Validate"
            onPress={validate}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title="Give Up"
            onPress={giveUp}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    paddingTop: 15
  },
  top: {
    height: 30,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  line: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30
  },
  bottom: {
    borderBottomWidth: 3
  },
  timer: {
    flexDirection: 'column'
  }
});