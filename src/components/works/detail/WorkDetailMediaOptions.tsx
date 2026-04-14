"use client";

import { createContext, useContext, type ReactNode } from "react";

type Value = { deferMediaUntilVisible: boolean };

const WorkDetailMediaOptionsContext = createContext<Value>({
  deferMediaUntilVisible: false,
});

export function WorkDetailMediaOptionsProvider({
  deferMediaUntilVisible,
  children,
}: {
  deferMediaUntilVisible: boolean;
  children: ReactNode;
}) {
  return (
    <WorkDetailMediaOptionsContext.Provider value={{ deferMediaUntilVisible }}>
      {children}
    </WorkDetailMediaOptionsContext.Provider>
  );
}

export function useWorkDetailMediaOptions() {
  return useContext(WorkDetailMediaOptionsContext);
}
