import axios from "axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import FormTemplate from "../components/FormTemplate";
import Group from "../../interfaces/Group";

interface FormData {
  email: string;
}

function AddUserForm(group: Group) {
  console.log(group);
  // const fetchGroup = async (groupId: string | undefined) => {
  //   try {
  //     const res = await axios.get(
  //       `http://127.0.0.1:5000/api/groups/${groupId}`
  //     );
  //     return res.data;
  //   } catch {
  //     alert("Error fetching group");
  //   }
  // };
  // const [group, setGroup] = useState<Group | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchGroup(groupId);
  //     setGroup(data);
  //   };
  //   fetchData();
  // }, [groupId]);

  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const { email } = formData;
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

  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    switch (name) {
      case "email":
        return value.trim() === "" ? "Email is required" : undefined;
      default:
        return undefined;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userRes = await axios.get(
        `http://127.0.0.1:5000/api/users/email/${email}`
      );

      const user = userRes.data;

      await axios.post(`http://127.0.0.1:5000/api/groups/${group.id}/users`, {
        user_id: user.id,
      });

      window.location.reload();
    } catch (err) {
      alert("Error adding a user");
    }
  };

  return (
    <div className="flex flex-grow justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full">
        <h1 className="text-2xl font-extrabold text-center mb-6">Add User</h1>
        <h2 className="text-2xl text-center mb-10">{group?.name}</h2>
        <div className="my-5">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-3 py-2.5 border rounded-lg w-full text-sm"
          />
          <span className="text-xs text-red-700">{errors.email}</span>
        </div>
        <Button type="submit" className="w-full" disabled={!email}>
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddUserForm;
