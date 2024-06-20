import { Link } from "react-router-dom";
import { User } from "../interfaces/User";
import Loading from "./Loading";
import Button from "./components/Button";

function Home(user: User) {
  return !user.username ? (
    <Loading />
  ) : (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-extrabold">Welcome, {user.username} </h1>
      <Button className="mt-8">
        <Link to="/groups">Your groups</Link>
      </Button>
    </div>
  );
}

export default Home;
