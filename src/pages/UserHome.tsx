import React from "react";
import useUserAuthService from "../services/user/useUserAuthService";

const UserHome: React.FC = () => {
  const { user, logOut } = useUserAuthService();

  return (
    <div>
      {user ? (
        <div>
          <h1>
            Welcome, {user.firstName} {user.lastName}
          </h1>
          <p>Email: {user.email}</p>
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        <h1>Welcome, Guest</h1>
      )}
    </div>
  );
};

export default UserHome;
