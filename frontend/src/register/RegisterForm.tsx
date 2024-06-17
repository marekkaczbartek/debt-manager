import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { username, email, password, confirmPassword } = formData;

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords must match";
        return newErrors;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log("Form submitted:", formData);
            // Here you can handle form submission (e.g., send data to an API)
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center mb-10">Register</h1>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="p-2 border my-3 rounded-lg w-full"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border my-3 rounded-lg p-2 w-full"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 border my-3 rounded-lg w-full"
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="p-2 border my-3 rounded-lg w-full"
            />
            <button
                type="submit"
                className="font-semibold bg-black text-white my-5 py-2 w-full rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
                disabled={!username || !email || !password || !confirmPassword}
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
