import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useStore } from "../hooks/useStores";
import Loading from "../components/loading/Loading";

const PrivateRoute = observer(({ children }) => {
  const { auth } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.user && auth.isLogged && auth.token.access_token !== null) {
      authService.setAuthInterceptor(auth.token.access_token);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (!auth.isLogged || !auth.token.access_token || !auth.user)
    return <Navigate to="/auth/login" />;
  else
    return loading ? (
      <div className="w-screen h-screen flex items-center justify-center"></div>
    ) : (
      children
    );
});

export default PrivateRoute;
