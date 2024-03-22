import type { ReactNode } from "react";
import type { Session } from "next-auth";

export interface ChildrenProps {
  readonly children: ReactNode;
}

export interface CustomSession extends Session {
  user?: {
    id: string;
    access_token: string;
    name?: string;
    email?: string;
  };
}
