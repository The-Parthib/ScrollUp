import * as React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthContextProvider } from "./context/AuthContext";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
