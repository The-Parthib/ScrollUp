import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { auth } from '@/firebaseConfig';

interface IProtectedRoutesProps {
}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = (props) => {

    const [user, loading] = useAuthState(auth);
    const location =  useLocation();
    console.log(location)

    if(loading){
      return(
        <h2>...loading</h2>
      )
    }

  return user ? (<Outlet/>):(
    <Navigate to="/login" state={{from :location}} />
  );
};

export default ProtectedRoutes;
