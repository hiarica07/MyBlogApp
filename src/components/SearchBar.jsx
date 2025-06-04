import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search[title]") || "");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // setSearchParams({ "search[title]": value });
    console.log(value);    
  };

  useEffect(() => {
    const delayBouncFn = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);

      if (query) {
        newParams.set("search[title]", query);
        newParams.delete("page"); // Reset page when searching
        // newParams.delete("limit"); // Reset limit when searching
      } else {
        newParams.delete("search[title]");
      }

      setSearchParams(newParams, { replace: false });
    }, 900);

    return () => clearTimeout(delayBouncFn);
  }, [query]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        maxWidth: 500,
        mx: "auto",
        mb: 2,
      }}
      elevation={1}
      // onSubmit={handleSearchSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search blogs..."
        // value={searchTerm}
        value={query}
        onChange={handleSearchChange}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
