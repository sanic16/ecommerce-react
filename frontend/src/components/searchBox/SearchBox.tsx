import { useNavigate, useParams } from "react-router-dom";
import classes from "./searchBox.module.css";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBox = () => {
  const navigate = useNavigate();
  const { search: keyword } = useParams<{ search: string }>();
  const [search, setSearch] = useState(keyword || "");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}/page/1`);
    } else {
      navigate("/");
    }
    setSearch("");
  };

  return (
    <form className={classes.search} onSubmit={submitHandler}>
      <input
        type="text"
        className={classes.searchTerm}
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">
        <CiSearch />
      </button>
    </form>
  );
};

export default SearchBox;
