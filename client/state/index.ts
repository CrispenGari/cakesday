export const setAccessToken = (token: string): void => {
  localStorage.setItem("token", token);
};
export const getAccessToken = (): string | null => {
  return localStorage.getItem("token");
};
