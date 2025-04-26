import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const UserDetails = ({ currentUserId }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isDisableUser, setIsDisableUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(fireDB, "usersInfo", id);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser({ ...userSnap.data(), id: userSnap.id });
        setIsDisableUser(userSnap.data().status === "disabled");
      } else {
        console.log("No such user!");
      }
    };

    fetchUser();
  }, [id]);

  // Delete user function with confirmation
  const handleDeleteUser = async () => {
    const userRef = doc(fireDB, "usersInfo", id);
    await deleteDoc(userRef);
    alert("User deleted successfully");
    navigate("/users"); // Redirect to users list page
  };

  // Toggle user disable/enable
  const handleDisableUser = async () => {
    const userRef = doc(fireDB, "usersInfo", id);
    const newStatus = isDisableUser ? "enabled" : "disabled";

    await updateDoc(userRef, {
      status: newStatus,
    });
    setIsDisableUser(!isDisableUser);
    alert(`User ${newStatus} successfully`);
  };

  // Prevent the admin from deleting or disabling themselves
  const handleAdminAction = (action) => {
    if (id === "KV9OrwuZJWbvzUzia6YnHV6fBQL2") {
      alert("You cannot delete or disable yourself.");
      return;
    }

    if (action === "delete") {
      setIsConfirmDeleteOpen(true);
    } else if (action === "disable") {
      handleDisableUser();
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteUser();
    setIsConfirmDeleteOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-4xl">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg mb-6">
            <img
              src={user.logo}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Name */}
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Details Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailItem label="Phone" value={user.number} />
          <DetailItem label="Country" value={user.country} />
          <DetailItem label="Address" value={user.address} />
          <DetailItem label="Hashed Password" value={user.hashedPasword} />
          <DetailItem label="Id" value={user.id} />
          <DetailItem label="Uid" value={user.uid} />

          {user.createdAt && (
            <DetailItem
              label="Account Created"
              value={user.createdAt.toDate().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => handleAdminAction("delete")}
            className="bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            Delete User
          </button>
          <button
            onClick={() => handleAdminAction("disable")}
            className={`${
              isDisableUser ? "bg-green-600" : "bg-yellow-600"
            } text-white px-4 py-2 rounded-xl`}
          >
            {isDisableUser ? "Enable User" : "Disable User"}
          </button>
        </div>

        {/* Confirmation Modal for Delete */}
        {isConfirmDeleteOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex space-x-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-600 text-white px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Small Component for Detail Item
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-lg font-semibold text-gray-800 break-words">{value}</p>
  </div>
);

export default UserDetails;
