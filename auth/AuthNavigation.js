// import { observer } from 'mobx-react-lite';
// import React, { useEffect } from 'react';
// import { useStore } from '@/hooks/useStore';
// import { useRouter } from 'next/router';

// const AuthNavigation = observer(({children}) => {
//   let navigate = useRouter();
//   const { auth } = useStore();

//   useEffect(() => {
//     if (auth.isLogged && auth.accessToken) {
//       navigate('/app/machine/digital-twin');
//     }
//   }, []);

//   return (
//     <div className="flex items-center justify-center w-screen h-screen">
//       {children}
//     </div>
//   );
// });

// export default AuthNavigation;

import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "next/router";

const AuthNavigation = observer(({ children }) => {
  const router = useRouter();
  const { auth } = useStore();

  useEffect(() => {
    if (auth.isLogged && auth.accessToken) {
      router.push("/auth/login");
      // router('/app/machine/digital-twin');
    }
  }, [auth.isLogged, auth.accessToken, router]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {children}
    </div>
  );
});

export default AuthNavigation;
