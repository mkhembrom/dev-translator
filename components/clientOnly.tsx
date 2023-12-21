"use client";
import React, { useEffect, useState } from "react";

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);
  return <>{isClient ? <>{children}</> : null}</>;
};

export default ClientOnly;
