import { actions } from '../actions'

const { DATA_FETCHING, DATA_FETCHED, DATA_FETCH_ERROR, IMAGE_UPDATED } =
  actions.profile

const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
}

const profileReducer = (state, action) => {
  // console.log(action.data)
  switch (action.type) {
    case DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      }
    }

    case DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action.data.user,
        posts: action.data.posts,
      }
    }

    case DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.user.avatar,
        },
      }
    }

    default:
      return state
  }
}

export { initialState, profileReducer }
