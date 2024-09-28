import { instance } from "../utils/client";
import { authStore } from "../stores/auth.store";

class AuthService {
  setAuthInterceptor(token) {
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common.Authorization;
    }
  }
  setUnauthorizedInterceptor(value) {
    if (authStore.isLogged) {
      if (value?.response?.status === 401) {
        alert("RUN");
        authStore.logOut();
        window.location.href = "/auth/login";
      } else if (value?.response?.status === 403) {
      } else {
        Promise.reject(value);
      }
    }
  }

  setSteps(step) {
    return instance.post("company/steps", {
      isSteps: step,
    });
  }

  login({ email, password }) {
    return instance.post("auth/login", {
      email,
      password,
    });
  }

  loginWithCompanyId({ email, password, companyId }) {
    return instance.post("auth/login-company", {
      email,
      password,
      companyId,
    });
  }

  //need to chnage this api parameter after fixing from back-end
  changePassword({ oldPassword, newPassword, newPasswordRepeat }) {
    return instance.post("user/change-temporary-password", {
      oldPassword,
      newPassword,
      newPasswordRepeat,
    });
  }

  addPasswordToAccount({ token, password, passwordRepeat }) {
    return instance.post("auth/change-password", {
      token: token,
      password: password,
      passwordRepeat: passwordRepeat,
    });
  }
}
const authService = new AuthService();
export { authService };
