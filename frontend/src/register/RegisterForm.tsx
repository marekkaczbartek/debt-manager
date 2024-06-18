import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function RegisterForm() {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const { username, email, password, confirmPassword } = formData;

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
        fieldName: keyof FormData,
        value: string
    ): string | undefined => {
        switch (fieldName) {
            case "username":
                return value.trim() === "" ? "Username is required" : undefined;
            case "email":
                return value.trim() === "" ? "Email is required" : undefined;
            case "password":
                return value.trim() === "" ? "Password is required" : undefined;
            case "confirmPassword":
                return formData.password !== value
                    ? "Passwords must match"
                    : undefined;
            default:
                return undefined;
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userCreationRes = await axios.post(
                "http://localhost:5000/api/users/",
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }
            );

            if (userCreationRes.status === 201) {
                navigate("/login", { replace: true });
            }
        } catch (err) {
            alert("Error creating a user");
        }
    };

    return (
        <div className="border-gray-300 border-2 text-black px-14 py-8 rounded-lg w-96">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-center mb-10">
                    Register
                </h1>
                <div className="my-5">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="px-3 py-2.5 border rounded-lg w-full text-sm"
                    />
                    <span className="text-xs text-red-700">
                        {errors.username}
                    </span>
                </div>
                <div className="my-5">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="px-3 py-2.5 border rounded-lg w-full text-sm"
                    />
                    <span className="text-xs text-red-700">{errors.email}</span>
                </div>
                <div className="my-5">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="px-3 py-2.5 border rounded-lg w-full text-sm"
                    />
                    <span className="text-xs text-red-700">
                        {errors.password}
                    </span>
                </div>
                <div className="my-5">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="px-3 py-2.5 border rounded-lg w-full text-sm"
                    />
                    <span className="text-xs text-red-700">
                        {errors.confirmPassword}
                    </span>
                </div>
                <button
                    type="submit"
                    className="font-semibold bg-black text-white my-5 py-2 w-full rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
                    disabled={
                        !username || !email || !password || !confirmPassword
                    }
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
