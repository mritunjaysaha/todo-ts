"use client";

import { store } from "@/lib/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export const Providers = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};
