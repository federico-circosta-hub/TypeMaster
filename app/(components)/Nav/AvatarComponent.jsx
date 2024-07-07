"use client";
import {
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterDialog from "../RegisterDialog";
import Link from "next/link";
import { logout } from "../../../lib/features/accountSlice";
import { green } from "@mui/material/colors";
import { t } from "i18next";

const AvatarComponent = () => {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openRegisterDialog, setOpenRegisterDialog] = useState({
    open: false,
    tab: 1,
  });

  const handleLogout = () => {
    setAnchorElUser(null);
    dispatch(logout());
    localStorage.setItem("account", "");
  };

  const LoggedOptions = [
    /*     {
      label: (
        <Link
          onClick={() => setAnchorElUser(null)}
          href={`/profile/${account.userId}`}
        >
          Profilo
        </Link>
      ),
      action: null,
    }, */
    { label: t("Logout"), action: handleLogout },
  ];
  const UnloggedOptions = [
    {
      label: t("Login"),
      action: () => {
        setOpenRegisterDialog({ open: true, tab: 2 });
        setAnchorElUser(null);
      },
    },
    {
      label: t("Register"),
      action: () => {
        setOpenRegisterDialog({ open: true, tab: 1 });
        setAnchorElUser(null);
      },
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar
          alt="avatar"
          sx={{ width: 52, height: 52, bgcolor: account.userColor }}
        >
          {account.username ? account.username[0].toUpperCase() : ""}
        </Avatar>
      </IconButton>
      <Menu
        sx={{ mt: "62px" }}
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
        {account.username
          ? LoggedOptions.map((option) => (
              <MenuItem key={option.label} onClick={option.action}>
                <Typography textAlign="center">{option.label}</Typography>
              </MenuItem>
            ))
          : UnloggedOptions.map((option) => (
              <MenuItem key={option.label} onClick={option.action}>
                <Typography textAlign="center">{option.label}</Typography>
              </MenuItem>
            ))}
      </Menu>
      {openRegisterDialog.open && (
        <RegisterDialog
          setOpenRegisterDialog={setOpenRegisterDialog}
          tab={openRegisterDialog.tab}
        />
      )}
    </Box>
  );
};

export default AvatarComponent;
