const intialState = {
  m: 0,
  s: 0
}

export default function timerReducers (state = intialState, action) {
  const { type, payload } = action
  
  switch(type) {
    case 'TIMER/SETM':
      return { ...state, m: payload }
    case 'TIMER/SETS':
      return { ...state, s: payload }
    default:
      return state
  }
}