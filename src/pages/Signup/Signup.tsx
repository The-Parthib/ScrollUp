import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/magicui/magic-card";

import { useUserAuth } from "@/context/AuthContext";

import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import type { UserSignIn } from "@/types/types";

interface ISignupProps {}

const initialvalue: UserSignIn = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup: React.FunctionComponent<ISignupProps> = () => {
  const [userInfo, setUserInfo] = React.useState<UserSignIn>(initialvalue);

  const { signUp, googleSignUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (userInfo.password !== userInfo.confirmPassword) {
        console.log("Passwords don't match");
        return;
      }
      await signUp(userInfo.email, userInfo.password);
      navigate("/");
      console.log(userInfo, " from sign up");
    } catch (error) {
      toast.error("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme
      });
      console.log("hjsg",error);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignUp();
      navigate("/");
      console.log("userInfo - google", userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <ToastContainer />
        <Card className="shadow-lg border-0 mx-auto">
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="p-0"
          >
            <CardHeader className="border-b border-border p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-center">
                Sign Up
              </CardTitle>
              <CardDescription className="text-center text-sm sm:text-base">
                Create your account to get started
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
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
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
                      value={userInfo.password}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                      }
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword" className="text-sm">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={userInfo.confirmPassword}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="p-4 sm:p-6 border-t border-border flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
                onClick={(e) => handleSubmit(e as any)}
              >
                Sign Up
              </Button>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground">Or</span>
              </div>
              <InteractiveHoverButton
                type="button"
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
                onClick={handleGoogleSignIn}
              >
                Sign up with Google
              </InteractiveHoverButton>
              <p className="text-xs sm:text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </MagicCard>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
