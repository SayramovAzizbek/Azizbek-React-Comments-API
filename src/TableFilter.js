import React, { useState, useEffect } from "react";
import axios from "axios";

const TableFilter = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState("");
//   const [inputName, setInputName] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      setData(res.data);
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(data.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const filterByName = (e) => {
    // setInputName(e);
    let filteredData = [];
    if (e.target.value !== "") {
      filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(e.target.value)
      );
      if (filteredData.length === 0) alert("No results found");
    } else {
      filteredData = currentPosts;
    }
    setFiltered(filteredData);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          //   value={inputName}
          placeholder="Search by Name"
          onChange={filterByName}
        />
        {/* <input
          type="text"
          value={filterBody}
          onChange={(e) => setFilterBody(e.target.value)}
          placeholder="Search by Body"
        /> */}
        {/* <button onClick={filterByName} type="submit">
          Search
        </button> */}
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {!filtered
            ? currentPosts.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.body}</td>
                </tr>
              ))
            : filtered.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.body}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <br />
      {pageNumbers.map((number) => (
        <button
          type="button"
          key={number}
          onClick={() => paginate(number)}
          style={{
            cursor: "pointer",
            padding: "1px",
            border: "1px solid #ccc",
            margin: "0 5px",
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
export default TableFilter;
