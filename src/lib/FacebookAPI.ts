type TFacebookAPI<T = any> = Promise<T>;

export const getLoginStatus = <T = any>(): TFacebookAPI<T> => {
  return new Promise((resolve, reject) => {
    try {
      return FB.getLoginStatus((response) => resolve(response));
    } catch (error) {
      reject(error);
    }
  });
};

export const handleLoginFB = <T = any>(): TFacebookAPI<T> => {
  return new Promise((resolve, reject) => {
    try {
      return FB.login((response) => resolve(response));
    } catch (error) {
      reject(error);
    }
  });
};

export const handleLogoutFB = <T = any>(): TFacebookAPI<T> => {
  return new Promise((resolve, reject) => {
    try {
      return FB.logout((response) => resolve(response));
    } catch (error) {
      reject(error);
    }
  });
};

export const getFacebookAPI = <T = any>(
  path = "",
  params = {}
): TFacebookAPI<T> => {
  return new Promise((resolve, reject) => {
    try {
      return FB.api(path, params, (response) => resolve(response));
    } catch (error) {
      reject(error);
    }
  });
};
