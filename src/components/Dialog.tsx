import { useState } from "react";
import { useAppSelector } from "../redux/hooks/hooks";
import { BiArrowToTop, BiSolidArrowFromTop } from "react-icons/bi";
import Stacks from "../components/Stacks";

type Props = {
  onShow: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dialog = (props: Props) => {
  const userInfo = useAppSelector((state) => state.credentials.userInfo);
  const [bounce, setBounce] = useState<boolean>(true);

  return (
    <>
      <div
        className={`${
          props.onShow ? "opacity-0" : "opacity-100 delay-500"
        } transition-all`}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: `${props.onShow ? "-100%" : "0"}`,
        }}
      >
        <BiSolidArrowFromTop
          onClick={() => props.setDialog(true)}
          className="text-3xl text-slate-800 cursor-pointer hover:text-slate-500"
        />
      </div>

      <div
        className={`${
          props.onShow ? "opacity-100" : "opacity-0"
        } lg:w-3/4 w-11/12 transition-all ease-in delay-150`}
        style={{
          position: "absolute",
          top: `${props.onShow ? "3%" : "-100%"}`,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div className="bg-slate-800 px-5 pt-8 pb-12 text-gray-300 rounded-md">
          <p className="text-2xl mb-3">
            Hello{" "}
            <span className="capitalize text-green-600">
              {userInfo.fullName}
            </span>
          </p>
          <p className="text-lg leading-tight text-justify">
            Welcome and thank you for visiting this site. I apologize if it took
            you a while to log in, I used free web hosting for both frontend and
            backend of this project. This is a simple User Athentication that
            stores <span className="text-green-600">JWT</span> token inside an{" "}
            <span className="text-green-600">HTTP only cookie.</span>{" "}
          </p>
          {/* Stacks component */}
          <Stacks />
        </div>
        <div className="flex justify-center mt-3">
          {" "}
          <BiArrowToTop
            onClick={() => {
              props.setDialog(false);
              setBounce(false);
            }}
            className={`text-3xl text-slate-800 cursor-pointer hover:text-slate-500 ${
              bounce && "animate-bounce"
            }`}
          />{" "}
        </div>
      </div>
    </>
  );
};
export default Dialog;
