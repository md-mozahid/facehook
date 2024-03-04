import { useEffect, useReducer } from 'react'
import { actions } from '../actions'
import PostList from '../components/posts/PostList'
import { useApi } from '../hooks/useApi'
import { initialState, postReducer } from '../reducers/PostReducer'

export default function Home() {
  const [state, dispatch] = useReducer(postReducer, initialState)
  const { api } = useApi()

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING })
    const fetchPost = async () => {
      try {
        const response = await api.get('/posts')
        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED,
            data: response.data,
          })
        }
      } catch (error) {
        console.error(error)
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error.message,
        })
      }
    }
    fetchPost()
  }, [api])

  if (state?.loading) {
    return <div> We are working...</div>
  }

  if (state?.error) {
    return <div> Error in fetching posts {state?.error?.message}</div>
  }

  return (
    <div>
      <PostList posts={state?.posts} />
    </div>
  )
}
