"use client";

import React from "react";
import { LoadingPageProvider } from "@/context/LoadingPageContext";

export default function LoadingPageProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoadingPageProvider>{children}</LoadingPageProvider>;
}
