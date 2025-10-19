"use client"

import { useUser } from "@/contextApi/context-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()

  const { isUserLoggedIn } = useUser();

  // mientras no hay usuario, mandamos al login
  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push("/login");
    } else {
      router.push("/usuarios")
    }
  }, []);

  return (
    <div></div>
  );
}
