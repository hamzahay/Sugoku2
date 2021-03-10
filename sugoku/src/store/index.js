import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import boardReducer from './reducers/board'
import playerReducer from './reducers/player'
import timerReducers from './reducers/timer'

const reducer = combineReducers({
  board: boardReducer,
  player: playerReducer,
  timer: timerReducers
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store