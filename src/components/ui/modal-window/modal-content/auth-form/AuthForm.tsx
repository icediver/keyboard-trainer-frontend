import { useAuth } from "@/hooks/useAuth";

import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFilePerson } from "react-icons/bs";
import styles from "../ModalContent.module.scss";
import Field from "../field/Field";
import { validEmail } from "./login-auth.constants";
import { useActions } from "@/hooks/useActions";

interface IAuth {
  // login: string;
  email: string;
  password: string;
}

const AuthForm: FC<{ setIsOpenOptions: (show: boolean) => void }> = ({
  setIsOpenOptions,
}) => {
  const [type, setType] = useState<"login" | "register">("login");
  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuth>({ mode: "onChange" });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { login, register } = useActions();

  const onSubmit: SubmitHandler<IAuth> = (data) => {
    if (type === "login") login(data);
    else if (type === "register") register(data);
    setIsOpenOptions(false);
    reset();
  };

  return (
    <div className={styles.content}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1>{type === "register" ? "Register" : "Login"} form</h1>
        <div>
          <div className={styles.input}></div>

          <div className={styles.input}>
            <label>email</label>
            {/*<input {...register('email')} />*/}
            <Field
              {...formRegister("email", {
                required: "Email is required",
                pattern: {
                  value: validEmail,
                  message: "Please enter valid email address",
                },
              })}
              placeholder={"Email"}
              error={errors.email?.message}
            />
          </div>
          <div className={styles.input}>
            <label>password</label>
            <Field
              {...formRegister("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Min length should more than 6 symbols!",
                },
              })}
              type="password"
              placeholder="Password"
              error={errors.password?.message}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <div
            onClick={() => setType(type === "register" ? "login" : "register")}
            className={styles.link}
          >
            {type === "login" ? "Register" : "Login"}
          </div>
          <input
            type={"submit"}
            value={type === "register" ? "Register" : "Login"}
          />
        </div>
      </form>
      <div className={styles.rightSide}>
        <div className={"absolute text-red-700"}>{errorMessage}</div>
        <BsFilePerson size={256} />
      </div>
    </div>
  );
};

export default AuthForm;
