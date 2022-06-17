import { combineReducers } from 'redux'; //Redux comes with this built-in function to combine reducers

import { SET_FILTER, SET_MOVIES, SET_USER  } from '../actions/actions';

function visibilityFilter(state = '', action) { //visibilityFilter reducer function
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) { //movies reducer function
  switch (action.type) {
    case SET_MOVIES:
        console.log('SET_MOVIES reducer reached');
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) { //user reducer function
    switch (action.type) {
      case SET_USER:
          console.log('SET_MOVIES reducer reached');
        return action.value;
      default:
        return state;
    }
  }

const moviesApp = combineReducers({ //shortened version of the below combined reducers
    visibilityFilter,
    movies,
    user
  });

//function moviesApp(state = {}, action) { //So, the moviesApp is a combined reducer (a reducer made out of the two reducers above)
  //return {
    //visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    //movies: movies(state.movies, action)
  //}
//}


export default moviesApp;