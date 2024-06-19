import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import FormTemplate from "../components/FormTemplate";

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
  const { setAccessToken } = useAuth();
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
      const loginRes = await axios.post("http://127.0.0.1:5000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      if (loginRes.status === 200) {
        const accessToken = loginRes.data.accessToken;
        console.log(accessToken);

        setAccessToken(accessToken);

        // // alert("User logged in");
        navigate("/home", { replace: true });
      }
    } catch (err) {
      alert("Wrong email or password");
    }
  };

  return (
    <div className="flex flex-grow justify-center items-center">
      <FormTemplate>
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
            <span className="text-xs text-red-700">{errors.password}</span>
          </div>
          <Button
            type="submit"
            disabled={!email || !password}
            className="w-full"
          >
            Login
          </Button>
        </form>
      </FormTemplate>
    </div>
  );
}

export default LoginForm;
