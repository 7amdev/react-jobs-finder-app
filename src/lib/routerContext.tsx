import React from "react";
import { useRouter } from "./routerHook";

export type RouterContextProps = ReturnType<typeof useRouter>;

const RouterContext = React.createContext<RouterContextProps | undefined>(
  undefined
);

export function useRouterContext() {
  const context = React.useContext(RouterContext);
  if (context === undefined) {
    throw new Error("useContext must be used within a provider");
  }

  return context;
}

export default function RouterProvider(props: React.PropsWithChildren) {
  const value = useRouter();

  return <RouterContext.Provider value={value} {...props} />;
}
