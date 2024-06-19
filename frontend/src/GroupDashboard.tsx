import axios from "axios";
import { User } from "../interfaces/User";
import Group from "../interfaces/Group";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserIcon from "./components/UserIcon";

function GroupDashboard(user: User) {
  const { groupId } = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupRes = await axios.get(
          `http://127.0.0.1:5000/api/groups/${groupId}`
        );
        setGroup(groupRes.data);
      } catch {
        throw new Error("Error fetching group");
      }

      try {
        const usersRes = await axios.get(
          `http://localhost:5000/api/groups/${groupId}/users`
        );
        const usersWithBalance = await Promise.all(
          usersRes.data.map(async (user: User) => {
            const balanceRes = await axios.get(
              `http://localhost:5000/api/users/${user.id}/balance/${groupId}`
            );
            return { ...user, balance: balanceRes.data.balance };
          })
        );
        setUsers(usersWithBalance);
      } catch {
        throw new Error("Error fetching users");
      }
    };
    fetchData();
  }, [groupId]);

  return (
    <div className="flex flex-grow justify-center">
      {!users || !group ? (
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
                <span key={user.id} className="flex items-center my-6">
                  <div className="mr-4 w-10 h-10 rounded-full flex items-center justify-center text-black text-3xl border-2 border-black leading-none">
                    +
                  </div>
                  <h1 className="text-xl font-bold">Add User</h1>
                </span>
              </Link>
              <Link
                to={`/groups/${groupId}/add/transaction`}
                className="hover:opacity-50"
              >
                <span key={user.id} className="flex items-center mb-10">
                  <div className="mr-4 w-10 h-10 rounded-full flex items-center justify-center text-black text-3xl border-2 border-black leading-none">
                    +
                  </div>
                  <h1 className="text-xl font-bold">Add Transaction</h1>
                </span>
              </Link>

              <div className="flex flex-col items-start">
                {users.map((user) => {
                  return (
                    <span key={user.id} className="flex items-center my-4">
                      <UserIcon
                        username={user.username}
                        className="mr-4"
                      ></UserIcon>
                      <h1 className="text-xl font-bold">{user.username}</h1>
                      {user.balance === 0 ? (
                        <p className="ml-2 text-xl">is even</p>
                      ) : user.balance > 0 ? (
                        <p className="ml-2 text-xl">is owed {user.balance}$</p>
                      ) : (
                        <p className="ml-2 text-xl">
                          owes {Math.abs(user.balance)}$
                        </p>
                      )}
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
