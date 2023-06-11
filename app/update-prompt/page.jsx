"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const resp = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
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

  useEffect(() => {
    const getPromptDetails = async () => {
      const resp = await fetch(`api/prompt/${promptId}`);
      const respData = await resp.json();
      setPost(respData);
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  return (
    <Form
      type={"Edit"}
      post={post}
      setPost={setPost}
      submitting={isSubmitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
