import React, { useState, ChangeEvent, FormEvent } from "react";

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // const validationErrors =;
        // if (Object.keys(validationErrors).length === 0) {
        //     console.log("Form submitted:", formData);
        //     alert("Form submitted!");
        //     // Here you can handle form submission (e.g., send data to an API)
        // } else {
        //     setErrors(validationErrors);
        // }

        alert("Form submitted!");
    };

    return (
        <div className="border-gray-300 border-2 text-black px-14 py-8 rounded-lg w-96">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-center mb-10">Login</h1>
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
                <button
                    type="submit"
                    className="font-semibold bg-black text-white my-5 py-2 w-full rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
                    disabled={!email || !password}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
