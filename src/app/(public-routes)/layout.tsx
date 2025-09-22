"use client";
import Header from "@/components/resuable/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <div className="text-xl font-bold">Image Analysis</div>
      </Header>
      <div className="mt-12 overflow-y-hidden h-100vh">
        <div className="w-full h-full overflow-auto">
          <div className="w-full h-full max-w-6xl mx-auto p-2">{children}</div>
        </div>
      </div>
    </>
  );
}
