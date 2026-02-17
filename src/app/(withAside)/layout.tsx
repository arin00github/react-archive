import GlobalLayout from "@/components/_common/layout/GlobalLayout";
import { ReactNode } from "react";

interface IWithAsideLayout {
  children: ReactNode;
}

const WithAsideLayout = ({ children }: IWithAsideLayout) => {
  return <GlobalLayout>{children}</GlobalLayout>;
};

export default WithAsideLayout;
