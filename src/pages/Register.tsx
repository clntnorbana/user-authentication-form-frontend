import Input from "../components/Input";
import Form from "../components/Form";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/slices/apiAuthSlice";

const Register = () => {
  const [fullName, setFullName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({ fullName, username, password }).unwrap();
      navigate("/login");
    } catch (err) {
      setErrorMsg(err.data.message);
      return;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (errorMsg) {
        setErrorMsg("");
      }
    }, 3000);
  }, [errorMsg]);

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Form
          title="Create an account"
          onSubmit={handleFormSubmit}
          message={errorMsg && errorMsg}
        >
          <Input
            type="text"
            placeholder="Enter your full name"
            name="fullname"
            label="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
          />
          {/* username */}
          <Input
            type="text"
            placeholder="Enter your username"
            name="username"
            label="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            disabled={isLoading}
          />
          {/* Password */}
          <Input
            type="password"
            placeholder="Create Password (e.g, clinTon@24)"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <Button text="Register" disabled={isLoading} />
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
            Don’t have an account yet?{" "}
            <Link
              to={"/login"}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login
            </Link>
          </p>
        </Form>
      </div>
    </section>
  );
};

export default Register;
