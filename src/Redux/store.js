import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const initialState = {
    currentUser : null,
    demoHeader : null,
}

export const store = createStore(reducers,initialState,applyMiddleware(thunk))