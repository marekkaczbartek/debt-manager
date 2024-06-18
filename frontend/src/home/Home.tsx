import axios from "axios";
import { User } from "../../interfaces/User";
import Group from "../../interfaces/Group";
import { useEffect, useState } from "react";
import GroupCard from "../components/GroupCard";
import PlaceholderGroupCard from "../components/PlaceholderGroupCard";

function Home(user: User) {
    const [groups, setGroups] = useState<Group[]>([]);
    const onClickDelete = async (group: Group) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/groups/${group.id}`);
            setGroups(groups.filter((g) => g.id !== group.id));
        } catch (err) {
            alert("Error");
        }
    };

    useEffect(() => {
        const fetchUserGroups = async () => {
            const res = await axios.get(
                `http://127.0.0.1:5000/api/users/${user.id}/groups`
            );

            setGroups(res.data);
        };
        fetchUserGroups();
    }, [user]);

    return (
        <div className="flex flex-grow justify-center items-center">
            <div className="flex-grow">
                {!user.username ? (
                    <h1 className="text-center">Loading...</h1>
                ) : (
                    <>
                        <h2 className="text-3xl font-bold text-center my-6">
                            Your balance: {user.balance}
                        </h2>
                        <div className="flex flex-row justify-evenly">
                            {groups.slice(0, 3).map((group: Group) => {
                                return (
                                    <div key={group.id}>
                                        <GroupCard
                                            id={group.id}
                                            groupName={group.name}
                                            groupBalance={100}
                                            onClickDelete={() =>
                                                onClickDelete(group)
                                            }
                                        ></GroupCard>
                                    </div>
                                );
                            })}
                            {Array(Math.max(3 - groups.length, 0))
                                .fill(null)
                                .map((_, index) => {
                                    return (
                                        <div key={index}>
                                            <PlaceholderGroupCard></PlaceholderGroupCard>
                                        </div>
                                    );
                                })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
