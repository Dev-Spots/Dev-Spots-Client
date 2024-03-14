"use client";

import { useState, type ChangeEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { swalError } from "@/helpers/swal";
import LoadingOverlay from "@/components/loader/overlay";

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
      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          minLength={6}
        />
      </div>
    </LoadingOverlay>
  );
}
