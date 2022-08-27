export const isEmail = (email) => {
  if (email && email.length) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  return false;
};
