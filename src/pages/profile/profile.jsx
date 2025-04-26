import React, { useContext, useState, useEffect } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";

const Profile = () => {
  const { user, updateUser, logout, deleteUser } = useContext(myContext);
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birth: "",
    country: "",
    address: "",
  });

  // Popup state for delete confirmation
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (user.length > 0) {
      setFormData({
        name: user[0]?.name || "",
        email: user[0]?.email || "",
        birth: user[0]?.birth || "",
        country: user[0]?.country || "",
        address: user[0]?.address || "",
      });
    }
  }, [user]);

  const handleEdit = (field) => setEditField(field);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async (field) => {
    if (!user[0] || !user[0].id) {
      console.error("Missing user ID");
      return;
    }

    const updatedUser = {
      ...user[0],
      ...formData,
    };

    await updateUser(updatedUser);
    setEditField(null);
  };

  // Handle the delete action - show confirmation
  const handleDeleteUser = () => {
    setShowDeleteConfirmation(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (user[0]?.id) {
      await deleteUser(user[0].id); // Call deleteUser function to delete the user account
    }
    setShowDeleteConfirmation(false); // Close confirmation dialog
  };

  // Cancel the delete action
  const cancelDelete = () => {
    setShowDeleteConfirmation(false); // Close confirmation dialog
  };

  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white px-4">
        <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md space-y-4">
          <div className="text-center">
            <img
              src={user[0]?.logo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold">User Profile</h2>
          </div>

          {["name", "email", "birth", "country", "address"].map((field) => (
            <div key={field} className="flex items-center justify-between">
              <label className="capitalize w-24">{field}:</label>
              {editField === field ? (
                <>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="bg-gray-700 text-white px-2 py-1 rounded w-full mx-2"
                  />
                  <button
                    onClick={() => handleSave(field)}
                    className="text-green-500 hover:underline"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="text-gray-300 w-full mx-2">
                    {formData[field] || "Not provided"}
                  </span>
                  <button
                    onClick={() => handleEdit(field)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}

          {/* Delete Button */}
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 text-white px-4 py-2 rounded-xl mt-4"
          >
            Delete Account
          </button>

          {/* Confirmation Popup */}
          {showDeleteConfirmation && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              <div className="bg-gray-800 p-6 rounded-xl w-1/3 space-y-4">
                <h3 className="text-lg font-bold text-center text-white">
                  Are you sure you want to delete your account?
                </h3>
                <div className="flex justify-around">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-500 text-white px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <div>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
