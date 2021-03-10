export function setBoard (payload) {
  return { type: 'BOARD/SETBOARD', payload }
}

export function setLoading (payload) {
  return { type: 'BOARD/SETLOADING', payload }
}

export function setInitialBoard (payload) {
  return { type: 'BOARD/SETINITIALBOARD', payload}
}

export function setStatus (payload) {
  return { type: 'BOARD/SETSTATUS', payload}
}

export function setStart (payload) {
  return { type: 'BOARD/SETSTART', payload}
}

export function setTimer (payload) {
  return { type: 'BOARD/SETTIMER', payload }
}

export function fetchBoard (payload) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    const res = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${payload}`)
    const data = await res.json()
    dispatch(setBoard(data.board))
    const newBoard = JSON.parse(JSON.stringify(data.board))
    dispatch(setInitialBoard(newBoard))
    dispatch(setLoading(false))
    dispatch(setStart(true))
  }
}

export function autoSolve (payload) {
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) =>
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  return async (dispatch) => {
    try {
      const res = await fetch('https://sugoku.herokuapp.com/solve', {
        method: 'POST',
        body: encodeParams(payload),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const data = await res.json()
      dispatch(setBoard(data.solution))
    } catch(err) {
      console.log(err)
    }
  }
}

export function checkValidate (payload) {
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) =>
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  return async (dispatch) => {
    console.log('on validate')
    const res = await fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(payload),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    const data = await res.json()
    if (data.status === 'broken') data.status = 'rule broke'
    dispatch(setStatus(data.status))
    if (data.status === 'solved') {
      dispatch(setStart(false))
    }
  }
}

export function setUsername (payload) {
  return { type: 'PLAYER/SETUSERNAME', payload }
}

export function setDifficulty (payload) {
  return { type: 'PLAYER/SETDIFFICULTY', payload }
}