"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/"); // Redirects to the main page (home)
  }, [router]);

  return <></>;
}
