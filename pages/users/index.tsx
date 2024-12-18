import UserCard from "@/components/common/UserCard";
import Header from "@/components/layout/Header";
import UserModal from "@/components/common/UserModal";
import { UserData } from "@/interfaces";
import { useState } from "react";

const Users: React.FC<{ users: UserData[] }> = ({ users }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userList, setUserList] = useState(users);

  const handleAddUser = (newUser: Partial<UserData>) => {
    const id = userList.length + 1;
    setUserList((prev) => [
      ...prev,
      { id, ...newUser, address: {}, company: {} } as UserData,
    ]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">User Details</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add User
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {userList.map(({ id, name, username, email, address, phone, website, company }: UserData) => (
            <UserCard
              key={id}
              {...{ id, name, username, email, address, phone, website, company }}
            />
          ))}
        </div>
      </main>
      <UserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}

export default Users;
