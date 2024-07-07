export const retrieveToken = (): string => {
  const lsAccount = JSON.parse(localStorage.getItem("account") || "");
  return lsAccount.jwt;
};
