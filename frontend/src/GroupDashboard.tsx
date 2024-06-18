import axios from "axios";
import { User } from "../interfaces/User";
import Group from "../interfaces/Group";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "./components/Button";
import CardTemplate from "./components/CardTemplate";

function GroupDashboard(user: User) {
    const { groupId } = useParams();
    const fetchGroup = async (groupId: string | undefined) => {
        try {
            const res = await axios.get(
                `http://127.0.0.1:5000/api/groups/${groupId}`
            );
            return res.data;
        } catch {
            alert("Error fetching group");
        }
    };
    const [group, setGroup] = useState<Group | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchGroup(groupId);
            setGroup(data);
        };
        fetchData();
    }, [groupId]);

    return (
        <div className="flex-grow">
            {!user.username ? (
                <h1 className="text-center">Loading...</h1>
            ) : (
                <>
                    {group && (
                        <div className="flex justify-center">
                            <CardTemplate className="w-full mx-10">
                                <h2 className="text-3xl font-bold text-center my-6">
                                    {group.name}
                                </h2>
                                <Link to={`/groups/${groupId}/add/user`}>
                                    Add user
                                </Link>
                            </CardTemplate>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default GroupDashboard;
