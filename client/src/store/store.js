import { createStore, applyMiddleware, compose } from "redux";
import { RootReducer } from "./root.reducer";


const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }

    console.log('type:', action.type);
    console.log('Payload:', action.payload);
    console.log('CurrentState', store.getState());

    next(action);

    console.log('Next State: ', store.getState());
}

// const middlewares = [logger];
const middlewares = [loggerMiddleware];
// const composedEnhancers = compose(applyMiddleware(...middlewares));
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(RootReducer, undefined, composedEnhancers);