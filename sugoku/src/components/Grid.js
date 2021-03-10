import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TextInput, Text, StyleSheet } from 'react-native'
import { ceil } from 'react-native-reanimated'

export default function Grid (props) {

  const grid = props.grid
  const idx = props.idx
  const index = props.index
  const initialBoard = useSelector(state => state.board.initialBoard)
  const [editable, setEditable] = useState(false)
  const [value, setValue] = useState('')

  useEffect (() => {
    if (grid === 0) {
      setValue('')
    } else {
      setValue(grid + '')
    }
  }, [grid])

  useEffect(() => {
    if (initialBoard[idx][index] === 0) {
      setEditable(true)
    }
  }, [])

  if (editable) {
    return (
      <TextInput 
        style={[
          styles.grid,
          (index === 2 || index === 5) ? styles.left : null
        ]}
        keyboardType='numeric'
        onChangeText={text => props.handleText(text, idx, index)}
        maxLength={1}
        value={ value }
      />
    )
  } else {
    return (
      <Text
        style={[
          styles.grid,
           styles.text,
           (index === 2 || index === 5) ? styles.left : null
          ]}
      >{ value }</Text>
    )
  }
}

const styles = StyleSheet.create({
  grid: {
    borderWidth: 1, textAlign: 'center', width: 35, height: 35,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#C0C0C0'
  },
  left: {
    borderRightWidth: 3
  }
})