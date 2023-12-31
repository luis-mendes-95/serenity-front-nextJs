"use client";
import GlobalStyle from "../globalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../contexts/authContext";
import { BowlProvider } from "../contexts/bowlContext";

const metadata = {
  title: "Serenity",
  description: "The path to serenity with better management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          {/*<GlobalStyle/>*/}
          <ToastContainer />
          <AuthProvider>
            <BowlProvider>{children}</BowlProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
