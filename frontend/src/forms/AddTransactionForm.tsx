import axios from "axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import FormTemplate from "../components/FormTemplate";
import Group from "../../interfaces/Group";
import { User } from "../../interfaces/User";

interface FormData {
  amount: string;
  description: string;
  user_ids: number[];
}

function AddTransactionForm(user: User) {
  const { groupId } = useParams();

  const [group, setGroup] = useState<Group | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupRes = await axios.get(
          `http://127.0.0.1:5000/api/groups/${groupId}`
        );
        const usersRes = await axios.get(
          `http://127.0.0.1:5000/api/groups/${groupId}/users`
        );
        setGroup(groupRes.data);
        setUsers(usersRes.data);
      } catch {
        alert("Error fetching group");
      }
    };
    fetchData();
  }, [groupId]);

  const [formData, setFormData] = useState<FormData>({
    amount: "",
    description: "",
    user_ids: [],
  });

  const navigate = useNavigate();

  const { amount, description, user_ids } = formData;
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the specific field in formData
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate only the changed field
    const validationError = validateField(name as keyof FormData, value);
    setErrors({
      ...errors,
      [name]: validationError,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const userId = parseInt(value);
    const updatedUserIds = checked
      ? [...formData.user_ids, userId]
      : formData.user_ids.filter((id) => id !== userId);

    setFormData({
      ...formData,
      user_ids: updatedUserIds,
    });
  };

  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    switch (name) {
      case "amount":
        return value.trim() === "" ? "Amount is required" : undefined;
      default:
        return undefined;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/transactions/`, {
        amount: parseInt(amount),
        description: description,
        user_owed_id: user.id,
        user_owing_ids: user_ids,
        group_id: groupId,
      });

      if (res.status === 201) {
        navigate(`/groups/${groupId}`, { replace: true });
      }
    } catch (err) {
      alert("Error adding a transaction");
    }
  };

  return (
    <div className="flex flex-grow justify-center items-center">
      <FormTemplate>
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-extrabold text-center mb-6">
            Add Transaction
          </h1>
          <h2 className="text-2xl text-center mb-10">{group?.name}</h2>
          <div className="my-5">
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={formData.amount.toString()}
              onChange={handleChange}
              className="px-3 py-2.5 border rounded-lg w-full text-sm"
            />
            <span className="text-xs text-red-700">{errors.amount}</span>
          </div>
          <div className="my-5">
            <h3 className="text-xl font-semibold mb-3">Select Users</h3>
            {users
              .filter((u) => u.id !== user.id && u.id !== undefined)
              .map((u) => (
                <div key={u.id} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={u.id || ""}
                      checked={formData.user_ids.includes(u.id || 0)}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    {u.username}
                  </label>
                </div>
              ))}
          </div>
          <Button type="submit" className="w-full" disabled={!amount}>
            Add
          </Button>
        </form>
      </FormTemplate>
    </div>
  );
}

export default AddTransactionForm;
