import React, { useState } from "react";
import "./Profile.css";


const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "Firstname",
    lastName: "Lastname",
    email: "rafiqurrahman51@gmail.com",
    phone: "+639433012384",
    bio: "none",
    address: {
      country: "Philippines",
      city: "Cabuyao",
      postalCode: "4025",
      taxId: "AS45645756",
    },
    profileImage: "https://via.placeholder.com/80", // Default profile image
  });

  const [editMode, setEditMode] = useState({
    personalInfo: false,
    address: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = (section) => {
    setEditMode({ ...editMode, [section]: !editMode[section] });
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={formData.profileImage} alt="Profile Avatar" />
            {editMode.personalInfo && (
              <div className="image-upload">
                <label htmlFor="profile-image-upload" className="upload-label">
                  Change Photo
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>
            )}
          </div>
          <div className="profile-info">
            <h2>
              {formData.firstName} {formData.lastName}
            </h2>
            <p>{formData.bio}</p>
            <p>
              {formData.address.city}, {formData.address.country}
            </p>
          </div>
          <button
            className="edit-btn"
            onClick={() => toggleEditMode("personalInfo")}
          >
            {editMode.personalInfo ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Personal Information Section */}
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            {editMode.personalInfo ? (
              <>
                <div>
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Email Address:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Bio:</label>
                  <input
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>First Name:</strong> {formData.firstName}
                </div>
                <div>
                  <strong>Last Name:</strong> {formData.lastName}
                </div>
                <div>
                  <strong>Email Address:</strong> {formData.email}
                </div>
                <div>
                  <strong>Phone:</strong> {formData.phone}
                </div>
                <div>
                  <strong>Bio:</strong> {formData.bio}
                </div>
              </>
            )}
          </div>
          {editMode.personalInfo && (
            <button
              className="save-btn"
              onClick={() => toggleEditMode("personalInfo")}
            >
              Save
            </button>
          )}
        </div>

        {/* Address Section */}
        <div className="profile-section">
          <h3>Address</h3>
          <div className="info-grid">
            {editMode.address ? (
              <>
                <div>
                  <label>Country:</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.address.country}
                    onChange={handleAddressChange}
                  />
                </div>
                <div>
                  <label>City/State:</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                  />
                </div>
                <div>
                  <label>Postal Code:</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.address.postalCode}
                    onChange={handleAddressChange}
                  />
                </div>
                <div>
                  <label>Tax ID:</label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.address.taxId}
                    onChange={handleAddressChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>Country:</strong> {formData.address.country}
                </div>
                <div>
                  <strong>City/State:</strong> {formData.address.city}
                </div>
                <div>
                  <strong>Postal Code:</strong> {formData.address.postalCode}
                </div>
                <div>
                  <strong>Tax ID:</strong> {formData.address.taxId}
                </div>
              </>
            )}
          </div>
          <button
            className="edit-btn"
            onClick={() => toggleEditMode("address")}
          >
            {editMode.address ? "Cancel" : "Edit"}
          </button>
          {editMode.address && (
            <button
              className="save-btn"
              onClick={() => toggleEditMode("address")}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;