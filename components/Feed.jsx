"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          post={post}
          handleTagClick={handleTagClick}
          key={post._id}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [loadedData, setLoadedData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch("/api/prompt");
      const respData = await resp.json();

      setLoadedData(respData);
    };
    getPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for tag and username"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>

      <PromptCardList data={loadedData} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
