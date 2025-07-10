import { ReactNode } from "react";
import TopMenu from "./top-menu";
import Breadcrumbs from "./breadcrumbs";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopMenu />
      <Breadcrumbs />
      {children}
    </div>
  );
}