import { useEffect } from "react";
import useUsersView from "../hooks/useUsersView";
export default function UsersTable() {
  const { data, fetchUsers } = useUsersView();

  useEffect(() => {
    fetchUsers();
  }, []);

  return <h1>Users Table</h1>;
}
