export const retrieveToken = (): string => {
  const lsAccount = JSON.parse(localStorage.getItem("persist:account") || "");
  return lsAccount.jwt.replace(/^"|"$/g, "");
};
