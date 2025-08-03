import { Button } from "@/components/ui/button";
import { Slide, ToastContainer, toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/magicui/magic-card";

import { useUserAuth } from "@/context/AuthContext";
import type { UserLogIn } from "@/types/types";

import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

interface ILoginProps {}

const initialvalue: UserLogIn = {
  email: "",
  password: "",
};

const Login: React.FunctionComponent<ILoginProps> = () => {
  const [userLogin, setUserLogin] = React.useState<UserLogIn>(initialvalue);

  const { logIn, googleSignUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logIn(userLogin.email, userLogin.password);
      navigate("/");
      console.log(userLogin, " from sign in");
    } catch (error) {
      toast.error("Invalid Credential");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignUp();
      navigate("/");
      console.log("userLogin - google", userLogin);
    } catch (error) {
      console.log(error);
    }
  };

  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
          transition={Slide}
        />
        <Card className="shadow-lg border-0 mx-auto">
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="p-0"
          >
            <CardHeader className="border-b border-border p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-center">
                Login
              </CardTitle>
              <CardDescription className="text-center text-sm sm:text-base">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={userLogin.email}
                      onChange={(e) =>
                        setUserLogin({ ...userLogin, email: e.target.value })
                      }
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-sm">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={userLogin.password}
                      onChange={(e) =>
                        setUserLogin({ ...userLogin, password: e.target.value })
                      }
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-10 sm:h-11 text-sm sm:text-base "
                  >
                    Sign In
                  </Button>
                </div>
              </form>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="m-3 px-2 text-muted-foreground">Or</span>
              </div>
              <InteractiveHoverButton
                type="button"
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
              </InteractiveHoverButton>
              <p className="m-4 text-xs sm:text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </MagicCard>
        </Card>
      </div>
    </div>
  );
};

export default Login;
