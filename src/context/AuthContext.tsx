import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";


// interface
interface IAuthContextProviderProps {
  children: React.ReactNode;
}


// types
type AuthContextData = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignUp: typeof googleSignUp;
};


// methods
const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  signOut(auth);
};

const googleSignUp = () => {
  const googleAuth = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuth);
};


// creating context
export const AuthContext = createContext<AuthContextData>({
  user: null,
  logIn,
  signUp,
  logOut,
  googleSignUp,
});


// creating provider
export const AuthContextProvider: React.FC<IAuthContextProviderProps> = ({children}) => {

    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if (user) {
                console.log("Logged in user state is : ",user);
                setUser(user);
            }
            else{
                console.log("logged out")
            }
        })
        return () => unsubscribe()
    }, [])
    

  const value: AuthContextData = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignUp,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserAuth = () => { 
    return useContext(AuthContext)
 }