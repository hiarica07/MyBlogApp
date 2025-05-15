import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";

import useAuthCall from "../hooks/useAuthCall";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const {logout} = useAuthCall();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* SM Screen Hamburger Menu */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          {/* <img src={logoPng} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height: "20px" }}/> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Bright Minds
          </Typography>

          {/* Hamburger Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/");
                  handleCloseNavMenu();
                }}
              >
                <Typography sx={{ textAlign: "center" }}>Dashboard</Typography>
              </MenuItem>
              {currentUser ? (
                <MenuItem
                  onClick={() => {
                    navigate("/new-blog");
                    handleCloseNavMenu();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>New Blog</Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    navigate("/login");
                    handleCloseNavMenu();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>New Blog</Typography>
                </MenuItem>
              )}

              <MenuItem
                onClick={() => {
                  navigate("/about");
                  handleCloseNavMenu();
                }}
              >
                <Typography sx={{ textAlign: "center" }}>About</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* MD-LG Screen Menu */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Bright Minds
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/");
                handleCloseNavMenu();
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              DashBoard
            </Button>
            {currentUser ? (
              <Button
                onClick={() => {
                  navigate("/new-blog");
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                New Blog
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/login");
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                New Blog
              </Button>
            )}

            <Button
              onClick={() => {
                navigate("/about");
                handleCloseNavMenu();
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {currentUser ? (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => {
                  navigate("/myblogs")
                  handleCloseUserMenu()
                }}>
                  <Typography
                    sx={{ textAlign: "center" }}
                  >
                    MyBlogs
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  // navigate("/myprofile")
                  handleCloseUserMenu()
                }}>
                  <Typography sx={{ textAlign: "center" }}>
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  navigate("/account")
                  handleCloseUserMenu()
                }}>
                  <Typography sx={{ textAlign: "center" }}>
                    Account
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/login");
                    handleCloseUserMenu();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>Login</Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
