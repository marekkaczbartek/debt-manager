import { User } from "../../interfaces/User";

export interface UserCardProps extends User {
  balance: number;
}

const UserCard = (user: UserCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center align-middle border-gray-300 border-2 text-black px-4 py-10 mx-auto my-10 max-w-xs rounded-lg">
      <h5 className="text-xl font-bold mb-2">{user.username}</h5>
      <h6 className="text-sm mb-2">{user.email}</h6>
      <h3 className="text-3xl font-bold">{user.balance}</h3>
    </div>
  );
};

export default UserCard;
