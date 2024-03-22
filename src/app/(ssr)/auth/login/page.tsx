import { getServerSideSession } from "@/helpers/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { loginHandler } from "@/actions/user";
import LoginForm from "./form";
import { Card } from "@/components/atoms/card/material-tailwind";
import { Typography } from "@/components/atoms/typography/material-tailwind";
import { Button } from "@/components/atoms/button/material-tailwind";

export default async function LoginPage() {
  if (await getServerSideSession()) redirect("/");

  return (
    <Card
      color="transparent"
      className="container bg-gray-900 w-3/4 h-3/4 flex flex-col items-center mx-auto py-8 border lg:my-32 max-w-screen-lg max-h-[75vh] md:my-36 my-40"
      shadow={false}
    >
      <hgroup>
        <Typography variant="h4" className="text-cyan-300 cursor-default">
          Sign In
        </Typography>
        <p className="text-lg cursor-default">
          <i className="fas fa-user" /> Sign Into Your Account
        </p>
      </hgroup>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 space-y-10"
        action={loginHandler}
      >
        <LoginForm />
        <Button type="submit" color="cyan" fullWidth>
          Submit
        </Button>
      </form>
      <p className="my-1 cursor-default">
        Don't have an account?{" "}
        <Link
          className=" text-cyan-300 cursor-pointer"
          prefetch
          href="/auth/register"
        >
          Sign Up
        </Link>
      </p>
    </Card>
  );
}
