export const retrieveToken = (): string => {
  const lsAccount = JSON.parse(localStorage.getItem("persist:account") || "");
  console.log("lsAccount.jwt", lsAccount.jwt.replace(/^"|"$/g, ""));
  return lsAccount.jwt.replace(/^"|"$/g, "");
};
