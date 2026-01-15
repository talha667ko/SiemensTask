import "./Login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { IxButton, IxContentHeader, IxInput } from "@siemens/ix-react";
import clsx from "clsx";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useLogin } from "../hooks/useAuth";
import type { LoginData } from "../types/auth";

export default function LoginForm() {
  const { t } = useTranslation();
  const loginMutation = useLogin();

  const validationSchema = yup.object({
    email: yup.string().required(t("login.email.error")),
    password: yup
      .string()
      .required(t("login.password.error.min"))
      .min(8, t("login.password.error.min"))
      .max(20, t("login.password.error.max")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginData>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  useLayoutEffect(() => {
    // Do instant validation after rendering
    trigger();
  }, [trigger]);

  const onSubmit = (data: LoginData) => {
    console.log(data);
    console.log("mutation");

    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });

    //navigation("/dashboard");
    /*const { dataR, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      console.log(error);
    } else {
      console.log(dataR);
    }*/
  };

  return (
    <>
      <IxContentHeader className="header">{t("login.title")}</IxContentHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        {/*---------------------------------------------------------- My Login form ------------------------------------------------*/}
        <IxInput
          type="email"
          label={t("login.email.label")}
          {...register("email")}
          className={clsx({ "ix-invalid": errors.email })}
          invalidText={errors.email?.message}
          required
        />

        <IxInput
          type="password"
          label={t("login.password.label")}
          helperText={t("login.password.helper")}
          {...register("password")}
          className={clsx({ "ix-invalid": errors.password })}
          invalidText={errors.password?.message}
        ></IxInput>
        {/*---------------------------------------------------------- My Login form ------------------------------------------------*/}
        <IxButton type="submit">{t("login.submit")}</IxButton>
      </form>
    </>
  );
}
