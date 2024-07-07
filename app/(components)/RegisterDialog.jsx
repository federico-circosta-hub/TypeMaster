import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { keyframes } from "@emotion/react";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPenNib,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../lib/features/accountSlice";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation, useRegisterMutation } from "../services/authApi";
import { t } from "i18next";
import HoverButton from "./SentenceButtons/HoverButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const moveGradient = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

const RegisterDialog = ({ setOpenRegisterDialog = () => {}, tab = 1 }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState(tab);
  const [formData, setFormData] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);

  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [loginUser, { isLoading: isLogin }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (e, nv) => {
    setSelectedTab(nv);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenRegisterDialog({ open: false, tab: 1 });
  };

  const handleSubmit = async () => {
    const postData = {
      name: formData.name,
      password: formData.password,
    };

    (selectedTab === 1 ? registerUser(postData) : loginUser(postData))
      .then((res) => {
        if (!res.data?.token) {
          toast.error(
            res.error.data.error ||
              `${
                selectedTab === 1
                  ? t("ErrorDuringRegister")
                  : t("ErrorDuringLogin")
              }`
          );
          return;
        }
        const decodedJWT = jwtDecode(res.data.token);
        toast(
          selectedTab === 1
            ? `✨ ${t("RegisterSuccess")} ✨`
            : `✨ ${t("WelcomeBack")} ${decodedJWT.username}! ✨`,
          {
            theme: "light",
          }
        );
        dispatch(setUser({ jwt: res.data.token, ...decodedJWT }));
        handleClose();
      })
      .catch(() => {
        `${
          selectedTab === 1 ? t("ErrorDuringRegister") : t("ErrorDuringLogin")
        }`;
      });
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            width: 550,
            borderRadius: "10px",
            padding: 4,
            background:
              "linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-to))",
            "--tw-gradient-from": "#9aa2ff",
            "--tw-gradient-to": "#fcbbff",
            backgroundSize: "160% 160%",
            animation: `${moveGradient} 8s ease infinite`,
          },
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={t("Register")}
              value={1}
              sx={{ color: "grey", fontWeight: 700 }}
            />
            <Tab
              label={t("Login")}
              value={2}
              sx={{ color: "grey", fontWeight: 700 }}
            />
          </Tabs>
        </Box>
        <Box>
          <DialogContent className="flex flex-col gap-6 ">
            <DialogContentText id="alert-dialog-slide-description">
              <Typography
                variant="h3"
                sx={{
                  fontSize: "24px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {selectedTab === 1
                  ? t("RegisterToShareScore")
                  : t("LoginToShareScore")}
              </Typography>
            </DialogContentText>

            <TextField
              InputLabelProps={{
                style: { color: "#ffffff" },
              }}
              inputProps={{
                autoComplete: "off",
                style: { color: "#ffffff", fontWeight: 600 },
              }}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />

            <TextField
              InputLabelProps={{
                style: { color: "#ffffff" },
              }}
              inputProps={{
                autoComplete: "off",
                style: { color: "#ffffff", fontWeight: 600 },
              }}
              onChange={handleChange}
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="fa-sm"
                          color={"grey"}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="fa-sm"
                          color={"grey"}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            {isLogin || isRegistering ? (
              <CircularProgress />
            ) : (
              <HoverButton
                icon={
                  selectedTab === 1 ? (
                    <FontAwesomeIcon icon={faPenNib} className="fa-xl" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      className="fa-xl"
                    />
                  )
                }
                text={selectedTab === 1 ? t("Register") : t("Login")}
                action={handleSubmit}
                disabled={!formData?.name || !formData?.password}
              />
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default RegisterDialog;
