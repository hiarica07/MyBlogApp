import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({handleSearchSubmit,handleSearchChange,searchTerm}) => {
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
          onSubmit={handleSearchSubmit}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
  )
}

export default SearchBar