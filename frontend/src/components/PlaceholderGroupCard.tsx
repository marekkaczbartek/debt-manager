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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      </span>
    </Card>
  );
};

export default PlaceholderGroupCard;
