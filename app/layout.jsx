import "./globals.css";
import { Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import App from "./App";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TypeMaster",
  description: "Challenge yourself with keyboard typing",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body className={inter.className}>
        <div className="flex flex-col h-screen max-h-screen">
          <App className="flex-grow">{children}</App>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
