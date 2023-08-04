import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks/hooks";
import { useLoginMutation } from "../redux/slices/apiAuthSlice";
import { setCredentials } from "../redux/slices/credentialSlice";
import { useEffect, useState } from "react";

const Login = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      setErrorMsg(err.data.message);
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
          title="Sign in to your account"
          onSubmit={handleFormSubmit}
          message={errorMsg && errorMsg}
        >
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
            placeholder="Enter your password"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <Button text="Login" disabled={isLoading} />

          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
            Don’t have an account yet?{" "}
            <Link
              to={"/register"}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </Form>
      </div>
    </section>
  );
};

export default Login;
