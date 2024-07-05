"use client";

import { usePathname } from "next/navigation";

const pathName = ["/admin/:path*"];
export function AdminDisablePathname() {
  const path = usePathname();
  const isDisablePath = pathName.includes(path);
  return <></>;
}
