"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";

import Input from "@/app/components/inputs/input";
import Button from "@/app/components/button";

import AuthSocialButton from "./auth-social-button";

type Variant = "signin" | "signup";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("signin");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "signin") {
      setVariant("signup");
    } else {
      setVariant("signin");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "signup") {
      axios
        .post("/api/sign-up", data)
        .then(() => toast.success("Sign up successful"))
        .catch(() => {
          
          if (!data.name) {
            toast.error("Invalid name");
          } else if (!data.email) {
            toast.error("Invalid email");
          } else if (!data.password) {
            toast.error("Invalid password");
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "signin") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }

          if (callback?.ok && !callback.error) {
            toast.success("Sign in successful");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }

        if (callback?.ok && !callback.error) {
          toast.success("Sign in successful");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "signup" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "signin" ? "Sign in" : "Sign up"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                {variant === "signin" ? "Or sign in with" : "Or sign up with"}
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
            <AuthSocialButton
              icon={BsFacebook}
              onClick={() => socialAction("facebook")}
            />
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "signin" ? "New user?" : "Already have account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer ">
            {variant === "signin" ? "Sign up" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
