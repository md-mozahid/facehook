import { useEffect } from "react";
import { actions } from "../actions";
import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

export default function Profile() {
  // const [user, setUser] = useState(null)
  // const [posts, setPosts] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)
  const { state, dispatch } = useProfile();
  const { api } = useApi();
  const { auth } = useAuth();

  useEffect(() => {
    // setLoading(true)
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);
        // setUser(response?.data?.user)
        // setPosts(response?.data?.posts)
        // console.log(response.data)
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);
        // setError(error)
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div className="">Fetching your profile data...</div>;
  }

  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
}
