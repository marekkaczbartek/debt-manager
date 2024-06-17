import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
    email: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

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
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
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
            <div>
                <label>Email:</label>
            </div>
            <div className="border-black my-2">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Password:</label>
            </div>
            <div className="border-black my-2">
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>
            <div>
                <label>Confirm Password:</label>
            </div>
        </form>
    );
};

export default RegisterForm;
