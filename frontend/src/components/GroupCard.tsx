import { Link } from "react-router-dom";
import Button from "./Button";
import CardTemplate from "./CardTemplate";

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
      <Link
        to={`/groups/${group.id}`}
        className="mb-6 w-32 h-32 rounded-full flex items-center justify-center text-black text-7xl border-2 border-black"
      >
        {firstLetter}
      </Link>

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
      <Button onClick={group.onClickDelete} className="w-1/2 my-3">
        Delete
      </Button>
    </CardTemplate>
  );
};

export default GroupCard;
