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
import type { UserLogIn } from "@/types/types";

import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

interface ILoginProps {}

const initialvalue: UserLogIn = {
  email: "",
  password: ""
};

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const [userLogin, setUserLogin] = React.useState<UserLogIn>(initialvalue);

  const { logIn, googleSignUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logIn(userLogin.email, userLogin.password);
      console.log(userLogin, " from sign in");
    } catch (error) {
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
                      Sign in using Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or Enter your Credentials below to Log in
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="dipesh@example.com"
                      value={userLogin.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserLogin({ ...userLogin, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={userLogin.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserLogin({ ...userLogin, password: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full m-3" type="submit">
                    Sign in
                  </Button>
                  <p className="mt-3 text-sm text-center text-green-500">
                   Don't have an account ?{" "}
                    <span className="text-blue-600">
                      <Link to="/signup">Sign Up</Link>
                    </span>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
)};

export default Login;
