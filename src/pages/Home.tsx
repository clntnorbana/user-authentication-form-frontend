import { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import { useAppSelector } from "../redux/hooks/hooks";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setCredentials } from "../redux/slices/credentialSlice";
import { removeCredentials } from "../redux/slices/credentialSlice";
import { useUpdateProfileMutation } from "../redux/slices/apiUserSlice";
import { useLogoutMutation } from "../redux/slices/apiAuthSlice";

const Home = () => {
  const userInfo = useAppSelector((state) => state.credentials.userInfo);

  const [fullname, setFullName] = useState<string>(userInfo.fullName);
  const [username, setUserName] = useState<string>(userInfo.username);
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [showDialog, setShowDialog] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [logout] = useLogoutMutation();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      setMessage("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          fullName: fullname,
          username,
          password,
        }).unwrap();

        dispatch(setCredentials(res));
        setMessage("Profile Updated");
      } catch (err) {
        setMessage(err.data.message);
      }
    }
  };

  const logoutAccount = async () => {
    try {
      await logout({}).unwrap();
      dispatch(removeCredentials({}));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (message) {
        setMessage("");
      }
    }, 3000);
  }, [message]);

  return (
    <section className="w-screen py-5 h-screen">
      <div className="container mx-auto h-full lg:px-44 px-5 flex justify-center items-center flex-col gap-5">
        {/* message dialog */}
        <Dialog onShow={showDialog} setDialog={setShowDialog} />
        {/* Info */}
        {!showDialog && (
          <Form
            onSubmit={handleFormSubmit}
            title="Your Info"
            message={message && message}
          >
            <Input
              disabled={!editMode}
              label="Name"
              type="text"
              placeholder="Your full name"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              disabled={!editMode}
              label="Username"
              type="text"
              placeholder="Your username"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            {editMode && (
              <>
                <Input
                  label="Update password"
                  optional={true}
                  type="password"
                  placeholder="Your new password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  disabled={!editMode}
                  label="Confirm Password"
                  type="password"
                  placeholder="Re-enter new password"
                  name="passwordRepeat"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                />
              </>
            )}
            <div className={`${editMode && "grid grid-cols-2 gap-2"}`}>
              <button
                type="button"
                onClick={() => setEditMode(editMode ? false : true)}
                className={`w-full ${
                  editMode
                    ? "text-white opacity-50 hover:opacity-100 border rounded-lg"
                    : "text-blue-400 hover:text-blue-700 underline"
                }`}
              >
                {editMode ? "Back" : "Edit Profile"}
              </button>
              {editMode && <Button text="Save Changes" disabled={isLoading} />}
            </div>
          </Form>
        )}
        {!showDialog && (
          <button
            onClick={logoutAccount}
            className="underline hover:opacity-50"
          >
            Logout
          </button>
        )}
      </div>
    </section>
  );
};
export default Home;
