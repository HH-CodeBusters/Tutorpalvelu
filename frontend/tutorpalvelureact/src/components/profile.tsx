import { useEffect, useState } from "react";
import type { appUser } from "../types";
import { getAuthenticatedUser } from "../services/user";


export default function Profile() {
  const [user, setUser] = useState<appUser | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getAuthenticatedUser()
      .then(res => res.json())
      .then(data => setUser(data))
      .catch((error: any) => {
        if (error.response?.data?.detail) {
          setError(error.response.data.detail);
        } else {
          setError("Käyttäjädataa ei löytynyt / et ole kirjautuneena sisään.");
        }
      });
  }, []);

  if (!user || error) return <p>Not logged in or user not found</p>;

  return (
    <div>
      <p>Your name is {user.firstname} {user.lastname}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
