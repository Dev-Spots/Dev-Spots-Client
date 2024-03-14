"use server";

import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";
import request from "@/lib/axios";

export const loginHandler = async (formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const {
      data: { data, message },
      status,
    } = await request.Mutation<{ access_token: string }>({
      url: `/user/login`,
      data: { email, password },
      method: "POST",
    });

    if (status !== 200) throw { message };

    redirect(`/auth/login?token=${data.access_token}`, RedirectType.replace);
  } catch (err) {
    redirect(
      `/auth/login?err=${(err as Error)?.message || "unexpected error"}`,
      RedirectType.push
    );
  }
};
