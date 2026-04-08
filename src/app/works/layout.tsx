import type { Metadata } from "next";

import { WorksContactFooter } from "@/components/works/WorksContactFooter";
import { WorksHeader } from "@/components/works/WorksHeader";

export const metadata: Metadata = {
  title: "WORKS",
};

export default function WorksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full bg-white text-[#242424]">
      <WorksHeader />
      <div className="pt-20">{children}</div>
      <WorksContactFooter />
    </div>
  );
}
