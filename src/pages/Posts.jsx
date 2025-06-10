import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Posts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        );
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    fetchPosts();
  }, [id]);

  const handleSearch = () => {
    if (searchId.trim() !== "") {
      navigate(`/${searchId}`);
    }
  };

  return (
    <>
      <div className="post__search">
        <button onClick={() => navigate('/')}>← Back</button>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Enter</button>
        </div>

        {loading
          ? new Array(10).fill(0).map((_, index) => (
              <div className="post" key={index}>
                <div className="post__title">
                  <div className="post__title--skeleton"></div>
                </div>
                <div className="post__body">
                  <p className="post__body--skeleton"></p>
                </div>
              </div>
            ))
          : posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="post__title">{post.title}</div>
                <p className="post__body">{post.body}</p>
              </div>
            ))}
      </div>
    </>
  );
};

export default Posts;
