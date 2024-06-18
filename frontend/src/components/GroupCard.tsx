import { UserGroupIcon } from "@heroicons/react/16/solid";
import axios from "axios";

interface GroupCardProps {
    id: number;
    groupName: string;
    groupBalance: number;
    onClickDelete: () => void;
}

const GroupCard = (group: GroupCardProps) => {
    const firstLetter = group.groupName.charAt(0).toUpperCase();
    return (
        <div className="flex flex-col items-center justify-center align-middle border-gray-300 border-2 text-black px-4 py-10 my-10 rounded-lg min-w-96 min-h-96">
            <span className="mb-6">
                <div className="w-32 h-32 rounded-full flex items-center justify-center text-black text-7xl border-2 border-black">
                    {firstLetter}
                </div>
            </span>
            <h5 className="text-2xl font-bold mb-4">{group.groupName}</h5>
            <h6 className="text-xl">Balance: {group.groupBalance}</h6>
            <button
                className="font-semibold bg-black text-white my-5 w-1/2 py-2 rounded-lg"
                onClick={() => group.onClickDelete()}
            >
                Delete
            </button>
        </div>
    );
};

export default GroupCard;
