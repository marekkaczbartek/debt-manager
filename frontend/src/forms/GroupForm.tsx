import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import Button from "../components/Button";
import FormTemplate from "../components/FormTemplate";

interface FormData {
  groupName: string;
}

function GroupForm(user: User) {
  const [formData, setFormData] = useState<FormData>({
    groupName: "",
  });

  const navigate = useNavigate();

  const { groupName } = formData;

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
      case "groupName":
        return value.trim() === "" ? "Group name is required" : undefined;
      default:
        return undefined;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const groupCreationRes = await axios.post(
        "http://localhost:5000/api/groups/",
        {
          name: groupName,
          owner_id: user.id,
        }
      );

      if (groupCreationRes.status === 201) {
        navigate("/groups", { replace: true });
      }
    } catch (err) {
      alert("Error creating a group");
    }
  };

  return (
    <div className="flex flex-grow justify-center items-center">
      <FormTemplate>
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center mb-10">Create Group</h1>
          <div className="my-5">
            <input
              type="text"
              name="groupName"
              placeholder="Name"
              value={formData.groupName}
              onChange={handleChange}
              className="px-3 py-2.5 border rounded-lg w-full text-sm"
            />
            <span className="text-xs text-red-700">{errors.groupName}</span>
          </div>
          <Button type="submit" className="w-full" disabled={!groupName}>
            Create
          </Button>
        </form>
      </FormTemplate>
    </div>
  );
}

export default GroupForm;
