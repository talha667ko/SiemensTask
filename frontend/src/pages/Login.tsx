import "./Login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { IxButton, IxContentHeader, IxInput } from "@siemens/ix-react";
import clsx from "clsx";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object({
  "mail-adress": yup.string().required("Your mail adress is required"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .max(20, "Your password cannot be more than 20 characters"),
  email: yup.string(),
});

export default function LoginForm() {
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  useLayoutEffect(() => {
    // Do instant validation after rendering
    trigger();
  }, [trigger]);

  const onSubmit = (data: any) => {
    console.log(data);
    navigation("/dashboard");
  };

  return (
    <>
      <IxContentHeader className="header">
        Welcome enter your credentials
      </IxContentHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        {/*---------------------------------------------------------- My Login form ------------------------------------------------*/}
        <IxInput
          type="email"
          label="Mail adress"
          {...register("mail-adress")}
          className={clsx({ "ix-invalid": errors["mail-adress"] })}
          invalidText={errors["mail-adress"]?.message}
          required
        />

        <IxInput
          type="password"
          label="Password"
          helperText="Enter your password"
          {...register("password")}
          className={clsx({ "ix-invalid": errors.password })}
          invalidText={errors.password?.message}
        ></IxInput>
        {/*---------------------------------------------------------- My Login form ------------------------------------------------*/}
        <IxButton type="submit">Submit</IxButton>
      </form>
    </>
  );
}
