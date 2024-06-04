"use client";
import { removeQueryString } from "@utils/helpers";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [filLoadedData, setFilLoadedData] = useState([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const tagSearch = searchParams.get("tag")?.replace("#", "");

  const handleFilter = (ssText) => {
    if (ssText !== "") {
      const filteredData = filLoadedData.filter((data) => {
        if (
          data.prompt.includes(ssText) ||
          data.tag.includes(ssText) ||
          data.creator.username.includes(ssText)
        ) {
          return true;
        }
        return false;
      });

      setLoadedData((prev) => [...filteredData]);
    } else {
      setLoadedData((prev) => [...loadedData]);
    }
  };
  const handleFilterByTag = (ssText) => {
    if (ssText !== "") {
      const filteredData = filLoadedData.filter((data) => {
        if (data.tag.includes(ssText)) {
          return true;
        }
        return false;
      });

      setLoadedData((prev) => [...filteredData]);
    } else {
      setLoadedData((prev) => [...loadedData]);
    }
  };

  const handleCancelClick = (event) => {
    setSearchText("");
    setLoadedData((prev) => [...loadedData]);
    const updatedUrl = removeQueryString(searchParams, "tag");
    router.push(updatedUrl);
  };

  const handleSearchChange = (e) => {
    const inputSearchText = e.target.value;
    setSearchText(inputSearchText);
    handleFilter(inputSearchText);
    // handle filter
  };

  const handleTagClick = (tag) => {
    setSearchText(`#${tag}`);
    handleFilterByTag(tag);
  };

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch("/api/prompt");
      const respData = await resp.json();

      setLoadedData(respData);
      setFilLoadedData(respData);
    };
    getPosts().then((_) => {
      if (tagSearch) handleTagClick(tagSearch);
    });
  }, []);

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for tag and username"
          value={searchText}
          onChange={handleSearchChange}
        />

        {searchText && (
          <button
            type="button"
            className="search_input-button"
            onClick={handleCancelClick}
          >
            &times;
          </button>
        )}
      </form>

      <PromptCardList data={loadedData} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
