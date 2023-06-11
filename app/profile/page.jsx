"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
const MyProfile = () => {
  const { data: session } = useSession();
  const [profData, setProfData] = useState([]);

  const router = useRouter();

  let refreshProfileData = false;

  const handleDelete = async (id) => {
    const checkDelete = confirm("Do you want to delete post ?");
    if (checkDelete) {
      await fetch(`/api/prompt/${id}`, {
        method: "DELETE",
      });

      const filteredPosts = profData.filter((prompt) => prompt._id === id);
      setProfData(filteredPosts);
    }
  };
  const handleEdit = async (id) => {
    router.push(`/update-prompt?id=${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/api/users/${session?.user.id}/posts`);
      const respData = await resp.json();

      setProfData(respData);
    };
    if (session?.user.id) fetchData();
  }, [refreshProfileData]);
  return (
    <Profile
      name="My"
      desc="Welcome to my profile page"
      data={profData}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
