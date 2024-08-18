import React, { useEffect, useState } from "react";
import { UserLogout, VerifyUser } from "../api/user.api";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [userType, setUserType] = useState("USER");
  const [activeTab, setActiveTab] = useState("Category1");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await UserLogout();
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserDetail = async () => {
    try {
      const response = await VerifyUser();
      if (response.status === 200) {
        setUserType(response?.data?.data?.role);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <header className="flex items-center justify-between px-5 py-3">
      <img
        className="w-32"
        src="https://miro.medium.com/v2/resize:fit:1035/1*9WJgQmBw6FIxe8wypznWfQ.jpeg"
        alt="Logo"
      />
      <nav className="flex flex-col">
        <div className="flex border-b border-gray-300 mb-2">
          {["Category1", "Category2", "Category3", "Category4", "Category5"].map((category) => (
            <button
              key={category}
              className={`tab-link text-gray-600 py-2 px-4 focus:outline-none border-b-2 ${
                activeTab === category ? "border-blue-500 text-blue-500" : "border-transparent hover:border-blue-500 hover:text-blue-500"
              }`}
              onClick={() => handleTabClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
      </nav>
      <div>
        {userType === "ADMIN" && (
          <Link to="/admin" className="bg-blue-200 border px-3 py-1 rounded mr-2">
            Admin
          </Link>
        )}
        <Link to="/profile" className="bg-blue-200 border px-3 py-1 rounded mr-2">
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="bg-blue-200 border px-2 py-1 rounded"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Header;
