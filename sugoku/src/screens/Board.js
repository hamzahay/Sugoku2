import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { fetchBoard, setBoard } from '../store/action'
import Grid from '../components/Grid'
import { autoSolve, checkValidate, setStatus } from '../store/action'

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
  const [time, setTime] = useState({ MM: 0, SS: 0 })
  const [mount, setMount] = useState(false)

  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, [dispatch])

  useEffect(() => {
    if (mount) {
      console.log(status, 'status')
      if (status === 'solved') {
        setTimeout(() => {
          navigation.navigate('Finish')
        }, 2100)
      }
      setTimeout(() => {
        dispatch(setStatus(''))
        setMount(false)
      }, 2000)
    }
    setMount(true)
  }, [status])

  useEffect(() => {
    console.log(start, 'start')
    let timer
    if(start) {
      console.log('it starting')
      timer = setInterval(() => {
        if (time.SS > 59) {
          setTime({ MM: time.MM++, SS: 0 })
        } else {
          setTime({ MM: time.MM, SS: time.SS++ })
        }
      }, 1000)
    } else {
      clearInterval(timer)
    }
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
          <Text style={{ textAlign: 'center'}}>{ time.SS }</Text>
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
    flexDirection: 'row'
  }
});