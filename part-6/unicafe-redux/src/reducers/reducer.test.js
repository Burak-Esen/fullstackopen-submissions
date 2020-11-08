import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  const actions = {
    good:{ type: 'GOOD' },
    ok:{ type: 'OK' },
    bad:{ type: 'BAD' },
    zero:{ type: 'ZERO' },
    doNothing:{
      type: 'DO_NOTHING'
    }
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    deepFreeze(state)
    const newState = counterReducer(undefined, actions.doNothing)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(counterReducer(state, actions.good), actions.good)
    expect(newState).toEqual({
      good: 2,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, actions.ok)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, actions.bad)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('state is reset', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(
      counterReducer(
        counterReducer(
          state, actions.bad
        ), actions.good
      ), actions.zero
    )
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})