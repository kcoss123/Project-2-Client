import React from "react";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

export const DefaultLayout = ({ children }) => {
  return (
    <div className="default-layout flex flex-col h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
