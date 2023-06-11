"use client";

import { useState } from "react";

import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreatePrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const resp = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (resp.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form
      type={"Create"}
      post={post}
      setPost={setPost}
      submitting={isSubmitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
