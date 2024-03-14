import { getServerSideSession } from "@/helpers/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import "@/styles/page/login.css";
import { loginHandler } from "@/actions/user";
import LoginForm from "./form";

export default async function LoginPage() {
  if (await getServerSideSession()) redirect("/");

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="signin-paragraph">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" action={loginHandler}>
        <LoginForm />
        <button type="submit" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account? <Link href="/auth/register">Sign Up</Link>
      </p>
    </>
  );
}
