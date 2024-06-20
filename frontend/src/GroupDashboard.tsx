import axios from "axios";
import { User } from "../interfaces/User";
import Group from "../interfaces/Group";
import Transaction from "../interfaces/Transaction";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserIcon from "./components/UserIcon";
import Modal from "./components/Modal";
import CardTemplate from "./components/CardTemplate";
import Button from "./components/Button";
import SettleTransactionForm from "./forms/SettleTransactionForm";
import AddUserForm from "./forms/AddUserForm";
import AddTransactionForm from "./forms/AddTransactionForm";

function GroupDashboard(user: User) {
  const { groupId } = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState<boolean>(false);

  const [isAllTransactionsModalOpen, setIsAllTransactionsModalOpen] =
    useState<boolean>(false);
  const [isUserTransactionsModalOpen, setIsUserTransactionsModalOpen] =
    useState<boolean>(false);
  const [isBalanceModalOpen, setBalanceModalOpen] = useState<boolean>(false);
  const [isSettleModalOpen, setIsSettleModalOpen] = useState<boolean>(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>();

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

      try {
        const transRes = await axios.get(
          `http://localhost:5000/api/groups/${groupId}/transactions`
        );
        setTransactions(transRes.data);
      } catch {
        throw new Error("Error fetching transactions");
      }
    };
    fetchData();
  }, [groupId]);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const TransactionElem = ({ t }: { t: Transaction }) => {
    return (
      <p className="text-xl my-4 mr-4">
        {t.user_owing_id === user.id
          ? "You owe "
          : `${users.find((u) => u.id === t.user_owing_id)?.username} owes `}
        {t.user_owed_id === user.id
          ? "You"
          : users.find((u) => u.id === t.user_owed_id)?.username}{" "}
        {t.amount}$
      </p>
    );
  };

  return (
    <div className="flex flex-grow justify-center text-center">
      {!users || !group ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <>
          {group && (
            <CardTemplate>
              <div>
                <h1 className="text-5xl font-bold my-4 h-full">{group.name}</h1>
              </div>
              <div className="flex flex-col my-6">
                {/* <Link
                  to={`/groups/${groupId}/add/user`}
                  className="hover:opacity-50"
                >
                  <h1 className="text-xl font-bold my-4">Add User</h1>
                </Link> */}
                <button
                  className="hover:opacity-50"
                  onClick={() => setIsAddUserModalOpen(true)}
                >
                  <h1 className="text-xl font-bold my-4">Add user</h1>
                </button>
                <Modal
                  onClose={() => setIsAddUserModalOpen(false)}
                  open={isAddUserModalOpen}
                >
                  <AddUserForm {...group}></AddUserForm>
                </Modal>
                {/* <Link
                  to={`/groups/${groupId}/add/transaction`}
                  className="hover:opacity-50"
                >
                  <h1 className="text-xl font-bold my-4">Add Transaction</h1>
                </Link> */}
                <button
                  className="hover:opacity-50"
                  onClick={() => setIsAddTransactionModalOpen(true)}
                >
                  <h1 className="text-xl font-bold my-4">Add transaction</h1>
                </button>
                <Modal
                  onClose={() => setIsAddTransactionModalOpen(false)}
                  open={isAddTransactionModalOpen}
                >
                  <AddTransactionForm
                    user={user}
                    group={group}
                  ></AddTransactionForm>
                </Modal>
                <div>
                  <button
                    onClick={() => setIsAllTransactionsModalOpen(true)}
                    className="hover:opacity-50"
                  >
                    <span key={user.id} className="flex items-center my-6">
                      <h1 className="text-xl font-bold">All transactions</h1>
                    </span>
                  </button>
                  <Modal
                    onClose={() => setIsAllTransactionsModalOpen(false)}
                    open={isAllTransactionsModalOpen}
                  >
                    <h1 className="text-3xl font-bold mb-10">Transactions:</h1>
                    {transactions.length === 0 ? (
                      <h1>No transactions</h1>
                    ) : (
                      transactions.map((t: Transaction) => {
                        return (
                          <div key={t.id} className="flex items-center">
                            <TransactionElem t={t} />
                          </div>
                        );
                      })
                    )}
                  </Modal>
                </div>
                <div>
                  <button
                    onClick={() => setIsUserTransactionsModalOpen(true)}
                    className="hover:opacity-50"
                  >
                    <span key={user.id} className="flex items-center my-4">
                      <h1 className="text-xl font-bold">Your transactions</h1>
                    </span>
                  </button>
                  <Modal
                    onClose={() => setIsUserTransactionsModalOpen(false)}
                    open={isUserTransactionsModalOpen}
                  >
                    <h1 className="text-3xl font-bold mb-10">
                      Your Transactions:
                    </h1>
                    <ul>
                      {transactions.length === 0 ? (
                        <h1>You have no transactions</h1>
                      ) : (
                        transactions
                          .filter(
                            (t: Transaction) =>
                              t.user_owed_id === user.id ||
                              t.user_owing_id === user.id
                          )
                          .map((t: Transaction) => {
                            return (
                              <li key={t.id} className="flex items-center">
                                <TransactionElem t={t} />
                                {t.user_owing_id !== user.id ? (
                                  ""
                                ) : (
                                  <Button
                                    className="px-4"
                                    onClick={() => {
                                      setCurrentTransaction(t);
                                      console.log(currentTransaction);
                                      setIsUserTransactionsModalOpen(false);
                                      setIsSettleModalOpen(true);
                                    }}
                                    disabled={t.amount === 0}
                                  >
                                    {t.amount === 0 ? "Settled" : "Settle"}
                                  </Button>
                                )}
                                {t.amount === 0 ? (
                                  <Button
                                    className="ml-2 px-4"
                                    onClick={() => handleDelete(t.id)}
                                  >
                                    Delete
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </li>
                            );
                          })
                      )}
                    </ul>
                  </Modal>
                  <Modal
                    onClose={() => {
                      setIsSettleModalOpen(false);
                    }}
                    open={isSettleModalOpen}
                    className="w-0.5"
                  >
                    <h1 className="text-3xl font-bold mb-10">Settle</h1>
                    <SettleTransactionForm
                      transactionId={currentTransaction?.id}
                    />
                  </Modal>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setBalanceModalOpen(true);
                    }}
                    className="hover:opacity-50"
                  >
                    <span key={user.id} className="flex items-center my-4">
                      <h1 className="text-xl font-bold">Balances</h1>
                    </span>
                  </button>
                  <Modal
                    onClose={() => setBalanceModalOpen(false)}
                    open={isBalanceModalOpen}
                  >
                    <h1 className="text-3xl font-bold mb-10">Balances</h1>
                    {users.map((user) => {
                      return (
                        <span key={user.id} className="flex items-center my-6">
                          <UserIcon
                            username={user.username}
                            className="mr-4"
                          ></UserIcon>
                          <h1 className="text-xl font-bold">{user.username}</h1>
                          {user && user.balance !== undefined ? (
                            user.balance === 0 ? (
                              <p className="ml-2 text-xl">is even</p>
                            ) : user.balance > 0 ? (
                              <p className="ml-2 text-xl">
                                is owed {user.balance}$
                              </p>
                            ) : (
                              <p className="ml-2 text-xl">
                                owes {Math.abs(user.balance)}$
                              </p>
                            )
                          ) : (
                            "is unknown"
                          )}
                        </span>
                      );
                    })}
                  </Modal>
                </div>
              </div>
            </CardTemplate>
          )}
        </>
      )}
    </div>
  );
}

export default GroupDashboard;
