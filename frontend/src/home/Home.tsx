import axios from "axios";
import { User } from "../../interfaces/User";
import Group from "../../interfaces/Group";
import { useEffect, useState } from "react";
import GroupCard from "../components/GroupCard";
import PlaceholderGroupCard from "../components/PlaceholderGroupCard";
import Button from "../components/Button";

function Home(user: User) {
  const [groups, setGroups] = useState<Group[]>([]);
  const onClickDelete = async (group: Group) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/groups/${group.id}`);
      setGroups(groups.filter((g) => g.id !== group.id));
    } catch (err) {
      throw new Error("Error deleting group");
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsRes = await axios.get(
          `http://127.0.0.1:5000/api/users/${user.id}/groups`
        );
        const groupsWithBalance = await Promise.all(
          groupsRes.data.map(async (group: Group) => {
            const balanceRes = await axios.get(
              `http://localhost:5000/api/users/${user.id}/balance/${group.id}`
            );
            return { ...group, balance: balanceRes.data.balance };
          })
        );
        setGroups(groupsWithBalance);
      } catch {
        throw new Error("Error fetching groups");
      }
    };
    fetchGroups();
  }, [user]);

  return (
    <div className="flex flex-grow justify-center items-center">
      <div className="flex-grow">
        {!user.username ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center my-6">
              {user.balance === 0
                ? "You are even!"
                : user.balance > 0
                ? `You are owed ${user.balance}$`
                : `You owe ${Math.abs(user.balance)}$`}
            </h2>
            <div className="text-center">
              <Button>Add Group</Button>
            </div>
            <div className="flex flex-row justify-evenly">
              {groups.slice(0, 3).map((group: Group) => {
                return (
                  <div key={group.id}>
                    <GroupCard
                      id={group.id}
                      groupName={group.name}
                      groupBalance={group.balance}
                      onClickDelete={() => onClickDelete(group)}
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
