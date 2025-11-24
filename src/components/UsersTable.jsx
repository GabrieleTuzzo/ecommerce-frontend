import { useEffect } from "react";
import useUsersView from "../hooks/useUsersView";
import Table from "./Table";
export default function UsersTable() {
  const { data, fetchUsers, deleteUser } = useUsersView();

  useEffect(() => {
    fetchUsers();
  }, []);

  return <Table itemsArray={data} handleDelete={deleteUser} />;
}
