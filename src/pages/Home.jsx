import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Home() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div>
      home
      <Link to="/profile">
        <p>Got to Profile Page</p>
      </Link>
    </div>
  );
}
