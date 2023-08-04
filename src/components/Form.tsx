import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  message?: string;
  onSubmit: (e: React.FormEvent) => void;
};

const Form = (props: Props) => {
  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {props.title}
        </h1>

        <form onSubmit={props.onSubmit} className="space-y-4 md:space-y-4">
          {props.message && (
            <p className="text-xs text-gray-50 bg-gray-500 p-2 text-center">
              {props.message}
            </p>
          )}
          {props.children}
        </form>
      </div>
    </div>
  );
};

export default Form;
