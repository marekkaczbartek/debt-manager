import axios from "axios";
import { User } from "../interfaces/User";
import Group from "../interfaces/Group";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "./components/Button";
import CardTemplate from "./components/CardTemplate";
import UserIcon from "./components/UserIcon";

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

    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(
                `http://localhost:5000/api/groups/${groupId}/users`
            );
            setUsers(res.data);
        };
        fetchUsers();
    }, [groupId]);
    return (
        <div className="flex flex-grow justify-center">
            {!user.username ? (
                <h1 className="text-center">Loading...</h1>
            ) : (
                <>
                    {group && (
                        <div>
                            <div>
                                <h1 className="text-5xl font-bold text-center my-6 h-full">
                                    {group.name}
                                </h1>
                            </div>
                            <Link
                                to={`/groups/${groupId}/add/user`}
                                className="hover:opacity-50"
                            >
                                <span
                                    key={user.id}
                                    className="flex items-center my-6"
                                >
                                    <div className="mr-4 w-10 h-10 rounded-full flex items-center justify-center text-black text-3xl border-2 border-black leading-none">
                                        +
                                    </div>
                                    <h1 className="text-xl font-bold">
                                        Add User
                                    </h1>
                                </span>
                            </Link>
                            <Link
                                to={`/groups/${groupId}/add/transaction`}
                                className="hover:opacity-50"
                            >
                                <span
                                    key={user.id}
                                    className="flex items-center mb-10"
                                >
                                    <div className="mr-4 w-10 h-10 rounded-full flex items-center justify-center text-black text-3xl border-2 border-black leading-none">
                                        +
                                    </div>
                                    <h1 className="text-xl font-bold">
                                        Add Transaction
                                    </h1>
                                </span>
                            </Link>

                            <div className="flex flex-col items-start">
                                {users.map((user) => {
                                    return (
                                        <span
                                            key={user.id}
                                            className="flex items-center my-4"
                                        >
                                            <UserIcon
                                                username={user.username}
                                                className="mr-4"
                                            ></UserIcon>
                                            <h1 className="text-xl">
                                                {user.username}
                                            </h1>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default GroupDashboard;
