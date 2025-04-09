import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // ✅ import uuid


export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [createdPosts, setCreatedPosts] = useState([]);

  const addPost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: uuidv4(), 
      createdAt: Date.now(),  
    };
    setCreatedPosts((prev) => [postWithId, ...prev]);
  };

  const deletePost = (id) => {
    setCreatedPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <PostContext.Provider value={{ createdPosts, addPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};
