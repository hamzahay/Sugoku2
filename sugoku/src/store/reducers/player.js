const intialState = {
  username: '',
  difficulty: 'easy'
}

export default function playerReducer (state = intialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'PLAYER/SETUSERNAME':
      return { ...state, username: payload}
    case 'PLAYER/SETDIFFICULTY':
      return { ...state, difficulty: payload}
    default:
      return state
  }
}