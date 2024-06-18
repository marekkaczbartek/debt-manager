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
            <h6 className="text-xl">Balance: {group.groupBalance}</h6>
            <Button onClick={group.onClickDelete} className="w-1/2">
                Delete
            </Button>
        </CardTemplate>
    );
};

export default GroupCard;
