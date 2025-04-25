import React, { useContext, useState, useEffect } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';

const Profile = () => {
  const { user, updateUser } = useContext(myContext);
  const currentUser = user[0]; // You may later use UID to identify the logged-in user

  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birth: '',
    country: '',
    address: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        birth: currentUser.birth || '',
        country: currentUser.country || '',
        address: currentUser.address || '',
      });
    }
  }, [currentUser]);

  const handleEdit = (field) => setEditField(field);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async (field) => {
    if (!currentUser || !currentUser.id) {
      console.error("Missing user ID");
      return;
    }

    const updatedUser = {
      ...currentUser,
      ...formData,
    };

    await updateUser(updatedUser);
    setEditField(null);
  };

  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white px-4">
        <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md space-y-4">
          <div className="text-center">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold">User Profile</h2>
          </div>

          {['name', 'email', 'birth', 'country', 'address'].map((field) => (
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
                    {formData[field] || 'Not provided'}
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
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
