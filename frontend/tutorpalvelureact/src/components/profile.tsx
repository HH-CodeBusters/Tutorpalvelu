import type { appUser } from "../types";
import { useOutletContext } from "react-router";

export default function Profile() {
  const user = useOutletContext<appUser | null>();

  if (!user) return <p>Not logged in.</p>;
  return (
    <div>
      <p>Your name is {user.firstname} {user.lastname}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
