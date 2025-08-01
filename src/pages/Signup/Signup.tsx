import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserAuth } from "@/context/AuthContext";
import type { UserSignIn } from "@/types/types";

import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(userInfo.email, userInfo.password);
      console.log(userInfo, " from sign in");
    } catch (error) {
      console.log(error);
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

  return (
    <div className="bg-slate-800 w-full h-screen">
      <div className="container mx-auto p-6 flex h-full">
        <div className="flex justify-center items-center w-full">
          <div className="w-2xl rounded-xl border bg-card text-card-foreground shadow-sm">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-blue-600 text-center mb-4">
                    ScrollUp
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid">
                    <Button variant="outline" onClick={handleGoogleSignIn}>
                      <Icons.google className="mr-2 h-4 w-4" />
                      Sign Up with Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="dipesh@example.com"
                      value={userInfo.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={userInfo.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmpassword">Confirm password</Label>
                    <Input
                      id="confirmpassword"
                      type="password"
                      placeholder="Confirm password"
                      value={userInfo.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({
                          ...userInfo,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full m-3" type="submit">
                    Sign Up
                  </Button>
                  <p className="mt-3 text-sm text-center text-green-500">
                    Already have an account ?{" "}
                    <span className="text-blue-600">
                      <Link to="/login">Login</Link>
                    </span>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
