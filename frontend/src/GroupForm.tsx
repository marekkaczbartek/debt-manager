import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";

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
                return value.trim() === ""
                    ? "Group name is required"
                    : undefined;
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
                navigate("/home", { replace: true });
            }
        } catch (err) {
            alert("Error creating a group");
        }
    };

    return (
        <div className="border-gray-300 border-2 text-black px-14 py-8 rounded-lg w-96">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-center mb-10">
                    Create Group
                </h1>
                <div className="my-5">
                    <input
                        type="text"
                        name="groupName"
                        placeholder="Name"
                        value={formData.groupName}
                        onChange={handleChange}
                        className="px-3 py-2.5 border rounded-lg w-full text-sm"
                    />
                    <span className="text-xs text-red-700">
                        {errors.groupName}
                    </span>
                </div>
                <button
                    type="submit"
                    className="font-semibold bg-black text-white my-5 py-2 w-full rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
                    disabled={!groupName}
                >
                    Create
                </button>
            </form>
        </div>
    );
}

export default GroupForm;
