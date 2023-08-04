import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./redux/hooks/hooks";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  const userInfo = useAppSelector((state) => state.credentials.userInfo);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            index={true}
            element={userInfo ? <Home /> : <Login />}
          />
          <Route
            path="/login"
            element={!userInfo ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!userInfo ? <Register /> : <Navigate to={"/"} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
