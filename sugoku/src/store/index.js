import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import boardReducer from './reducers/board'
import playerReducer from './reducers/player'

const reducer = combineReducers({
  board: boardReducer,
  player: playerReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store