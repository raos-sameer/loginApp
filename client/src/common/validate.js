export const isValidPassword = (str) => {
  return str.length >= 8;
};

export const isValidEmailAddress = (str) => {
  const regex = /[^@]+@[^\.]+\..+/g;
  return regex.test(str);
};

export const isValidLoginDetails = (loginDetails) => {
  console.log(loginDetails);
  const isValidEmailPwd =
    isValidEmailAddress(loginDetails.email) &&
    isValidPassword(loginDetails.password);
  return loginDetails.confirmPwd
    ? isValidEmailPwd && loginDetails.confirmPwd === loginDetails.password
    : isValidEmailPwd;
};
