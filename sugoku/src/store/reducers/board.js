const intialState = {
  board: [],
  initialBoard: [],
  loading: false,
  start: false,
  status: '',
  timer: {
    MM: 0,
    SS: 0
  }
}

export default function boardReducer (state = intialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'BOARD/SETBOARD':
      return { ...state, board: payload }
    case 'BOARD/SETLOADING':
      return { ...state, loading: payload }
    case 'BOARD/SETINITIALBOARD':
      return { ...state, initialBoard: payload }
    case 'BOARD/SETSTATUS':
      return { ...state, status: payload }
    case 'BOARD/SETSTART':
      return { ...state, start: payload }
    case 'BOARD/SETTIMER':
      return { ...state, timer: payload }
    default:
      return state
  }
}