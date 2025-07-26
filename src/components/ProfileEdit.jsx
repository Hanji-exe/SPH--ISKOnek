import React, { useState } from "react";

function ProfileEditForm({ currentUser, onUpdate }) {
  const [profile, setProfile] = useState(currentUser.profile || {});
  const [name, setName] = useState(currentUser.name);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedUser = { ...currentUser, name, profile };
    // TODO: Replace with your real AWS API Gateway endpoint
    await fetch(`https://your-api-id.execute-api.region.amazonaws.com/prod/users/${currentUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
    onUpdate(updatedUser);
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleSave}>
      <h2>Edit Profile</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        name="bio"
        value={profile.bio || ""}
        onChange={handleChange}
        placeholder="Bio"
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default ProfileEditForm; 