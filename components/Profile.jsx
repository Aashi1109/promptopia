import { useRouter } from "next/navigation";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data }) => {
  const router = useRouter();
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

  const handleTagClick = (tag) => {
    router.push(`/?tag=${tag?.replace("#", "")}`);
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            post={post}
            handleTagClick={handleTagClick}
            key={post._id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
