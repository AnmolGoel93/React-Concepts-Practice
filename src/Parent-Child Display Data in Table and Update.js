import './App.css';
import { useEffect, useState } from "react"
// import Search from "./components/Search"
// import PostsList from "./components/PostsList"

function App() {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getPosts().then(posts => setPosts(posts))
}, []);

const getPosts = async function () {
  return await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((result) => result)
}

const searchHandler = (searchValue) => {
  let filteredPosts = [...posts];
  filteredPosts.filter((post) => {
    if (!searchValue) return true 
    if (
      post.title.includes(searchValue) || post.body.includes(searchValue)
    ) return true
  })

  setPosts(filteredPosts);
}

const handleSearchChange = function () {
  
}

return (
  <div>
      <form onSubmit={(event) => event.preventDefault()}>
          <label>Enter Search Value : </label>
          <input placeholder="Search" type="search" value={searchValue} onChange={handleSearchChange}/>
      </form>
  </div>
    // <div className="App">
    //   <Search searchHandler={searchHandler}/>
    //   <hr />
    //   <PostsList posts={posts}/>
    // </div>
  );
}

export default App;


import React from "react";

const PostsList = function({posts}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {
                    posts.map(post => {
                        return (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

export default PostsList

import React, {useState} from "react";

const Search = function ({searchHandler}) {
    const [searchValue, setsearchValue] = useState("");

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setsearchValue(searchValue);
        searchHandler(searchValue);
    }

    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <label>Enter Search Value : </label>
            <input placeholder="Search" type="search" value={searchValue} onChange={handleSearchChange}/>
        </form>
    );
};

export default Search;