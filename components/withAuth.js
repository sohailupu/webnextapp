// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { observer } from 'mobx-react-lite';
// import { useStore } from '@/hooks/useStore';

// const withAuth = (WrappedComponent) => {
//   const AuthenticatedComponent = observer((props) => {
//     const router = useRouter();
//     const { auth } = useStore();

//     useEffect(() => {
//       if (auth.isLogged && auth.accessToken) {
//         router.push('/auth/login');
//       }
//     }, [auth.isLogged, auth.accessToken, router]);

//     if (auth.isLogged && auth.accessToken) {
//       return null; //loading spinner
//     }

//     return <WrappedComponent {...props} />;
//   });

//   return AuthenticatedComponent;
// // return null
// };

// export default withAuth;

import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = observer((props) => {
    const router = useRouter();
    const { auth } = useStore();

    useEffect(() => {
      if (auth.isLogged && auth.accessToken) {
        router.push('/auth/login');
      }
    }, [auth.isLogged, auth.accessToken]);

    if (auth.isLogged && auth.accessToken) {
      return null; //loading spinner
    }

    return <WrappedComponent {...props} />;
  });

  return AuthenticatedComponent;
};

export default withAuth;
