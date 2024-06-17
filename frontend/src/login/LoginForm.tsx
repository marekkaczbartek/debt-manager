import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import RegisterNavbar from "../register/RegisterNavbar";
import { useAuth } from "../AuthContext";

interface FormData {
    email: string;
    password: string;
}

function LoginForm() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const { email, password } = formData;
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const { setToken } = useAuth();
    const navigate = useNavigate();

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
            case "email":
                return value.trim() === "" ? "Email is required" : undefined;
            case "password":
                return value.trim() === "" ? "Password is required" : undefined;
            default:
                return undefined;
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const loginRes = await axios.post(
                "http://localhost:5000/api/login",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            if (loginRes.status === 200) {
                setToken(loginRes.data.token);

                // alert("User logged in");
                navigate("/home", { replace: true });
            }
        } catch (err) {
            alert("Wrong email or password");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <RegisterNavbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="border-gray-300 border-2 text-black px-14 py-8 rounded-lg w-96">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold text-center mb-10">
                            Login
                        </h1>
                        <div className="my-5">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="px-3 py-2.5 border rounded-lg w-full text-sm"
                            />
                            <span className="text-xs text-red-700">
                                {errors.email}
                            </span>
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
                        <button
                            type="submit"
                            className="font-semibold bg-black text-white my-5 py-2 w-full rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
                            disabled={!email || !password}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
