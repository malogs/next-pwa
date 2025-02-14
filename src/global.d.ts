/* eslint-disable @typescript-eslint/no-explicit-any */
interface Navigator {
  contacts?: {
    select: (properties: string[], options?: { multiple: boolean }) => Promise<any>;
  };
}

declare module "next-pwa" {
  import { NextConfig } from "next";
  export default function withPWA(config: NextConfig): NextConfig;
}

interface IContact {
  name: string;
  phone: string;
  image: string;
}

interface ITransaction {
  date: string;
  reason: string;
  receipient: IContact;
  charges: number;
  amount: number;
  time?: string;
}
