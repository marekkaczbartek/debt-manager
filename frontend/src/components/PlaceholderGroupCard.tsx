import { Link } from "react-router-dom";
import CardTemplate from "./CardTemplate";

const PlaceholderGroupCard = () => {
  return (
    <Link to="/groups/new">
      <CardTemplate className="hover: hover:opacity-70 hover:border-black bg-gray-50">
        <span className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </span>
      </CardTemplate>
    </Link>
  );
};

export default PlaceholderGroupCard;
