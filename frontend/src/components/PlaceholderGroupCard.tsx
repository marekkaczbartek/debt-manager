import { Link } from "react-router-dom";
import Card from "./CardTemplate";

const PlaceholderGroupCard = () => {
  return (
    <Card>
      <span className="mb-6">
        <Link
          to="/groups/new"
          className="rounded-full flex items-center justify-center text-black text-7xl "
        >
          +
        </Link>
      </span>
    </Card>
  );
};

export default PlaceholderGroupCard;
