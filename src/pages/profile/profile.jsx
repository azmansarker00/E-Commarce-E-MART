import { useState } from "react";
import { Pencil } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Azman Sarker",
    email: "azman@example.com",
    birthDate: "2003-04-25",
    country: "Bangladesh",
    address: "123 Azman Street, Dhaka",
  });

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    birthDate: false,
    country: false,
    address: false,
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const toggleEdit = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://i.pravatar.cc/100"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">User Profile</h2>
          <p className="text-gray-500">Edit your personal information</p>
        </div>
      </div>

      {Object.entries(profile).map(([field, value]) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-600 capitalize mb-1">{field.replace(/([A-Z])/g, " $1")}:</label>
          <div className="flex items-center gap-2">
            {editMode[field] ? (
              <input
                type={field === "birthDate" ? "date" : "text"}
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <p className="flex-1">{value}</p>
            )}
            <button
              onClick={() => toggleEdit(field)}
              className="text-blue-500 hover:text-blue-700"
            >
              <Pencil size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
