import { useEffect, useState } from "react";
import { type appUser } from "../types";

export default function Profile() {
  const [user, setUser] = useState<appUser | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/tutors/1")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <p>Your name is {user.firstname} {user.lastname}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
