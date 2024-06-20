import { Link } from "react-router-dom";
import Button from "./Button";
import CardTemplate from "./CardTemplate";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/16/solid";

interface GroupCardProps {
  id: number;
  groupName: string;
  groupBalance: number;
  onClickDelete: () => void;
}

const GroupCard = (group: GroupCardProps) => {
  const firstLetter = group.groupName.charAt(0).toUpperCase();
  return (
    <CardTemplate>
      <div className="mb-6 w-32 h-32 rounded-full flex items-center justify-center text-black text-7xl border-2 border-black">
        {firstLetter}
      </div>

      <h5 className="text-2xl font-bold">{group.groupName}</h5>
      <span key={group.id} className="my-4 text-center">
        {group.groupBalance === 0 ? (
          <p className="text-xl">You are even</p>
        ) : group.groupBalance > 0 ? (
          <p className="text-xl">You are owed {group.groupBalance}$</p>
        ) : (
          <p className="text-xl">You owe {Math.abs(group.groupBalance)}$</p>
        )}
      </span>
      <div className="flex">
        <Link to={`/groups/${group.id}`}>
          <Button className="my-3 mx-1">More</Button>
        </Link>
        <Button onClick={group.onClickDelete} className="my-3 mx-1 bg-red-500">
          Leave
        </Button>
      </div>
    </CardTemplate>
  );
};

export default GroupCard;
