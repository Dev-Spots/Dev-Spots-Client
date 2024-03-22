"use client";

import { useState, type ChangeEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { swalError } from "@/helpers/swal";
import LoadingOverlay from "@/components/loader/overlay";
import { Input } from "@/components/atoms/form/material-tailwind";
import { Typography } from "@/components/atoms/typography/material-tailwind";

export interface LoginState {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { pending } = useFormStatus();
  const [data, setData] = useState<LoginState>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev: LoginState) => ({
      ...prev,
      [name]: value,
    }));
  };

  const searchParams = new URLSearchParams(useSearchParams()!);
  const token = searchParams.get("token");
  const error = searchParams.get("err");

  useEffect(() => {
    if (token)
      (async () => {
        await signIn("credentials", { access_token: token, redirect: false });
        window.history.replaceState({}, "", window.location.pathname);
        router.replace("/");
      })();

    if (error) {
      swalError(error);
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }
  }, [token, error]);

  return (
    <LoadingOverlay spinner text="...loading" active={pending}>
      <div className="mb-1 flex flex-col gap-6">
        <Typography
          variant="h6"
          color="blue-gray"
          className="-mb-2 text-cyan-100"
        >
          Your Email
        </Typography>
        <Input
          size="lg"
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-cyan-300"
          labelProps={{
            className: "before:content-none after:content-none text-gray-50",
          }}
          onChange={handleChange}
          value={data.email}
          name="email"
          variant="outlined"
          color="white"
        />
        <Typography
          variant="h6"
          color="blue-gray"
          className="-mb-2 text-cyan-100"
        >
          Password
        </Typography>
        <Input
          type="password"
          value={data.password}
          onChange={handleChange}
          name="password"
          variant="outlined"
          size="lg"
          color="white"
          placeholder="********"
          className=" !border-t-blue-gray-200 focus:!border-t-cyan-300"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
    </LoadingOverlay>
  );
}
