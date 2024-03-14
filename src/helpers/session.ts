"use server";

import type { CustomSession } from "@/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getServerSideSession() {
  return (await getServerSession(authOptions)) as CustomSession | null;
}
