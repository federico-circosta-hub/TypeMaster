import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide, { SlideProps } from "@mui/material/Slide";
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
import { setUser } from "../../../lib/features/accountSlice";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation, useRegisterMutation } from "../../services/authApi";
import HoverButton from "../SentenceButtons/HoverButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref: React.ForwardedRef<unknown>
): React.JSX.Element {
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

type TabType = { tab: number; open: Boolean };
type FormData = { name: string; password: string };

const RegisterDialog = ({
  setOpenRegisterDialog = (p0: { tab: number; open: boolean }) => {},
  defaultTab = { tab: 1, open: false },
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<TabType>(defaultTab);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [loginUser, { isLoading: isLogin }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nv: number
  ) => {
    const changedTab: TabType = { tab: nv, open: true };
    setSelectedTab(changedTab);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenRegisterDialog({ tab: 1, open: false });
  };

  const handleSubmit = async () => {
    const postData = {
      name: formData.name,
      password: formData.password,
    };

    (selectedTab.tab === 1 ? registerUser(postData) : loginUser(postData))
      .then((res: any) => {
        if (!res.data?.token) {
          toast.error(
            res?.error?.data?.error ||
              `${
                selectedTab.tab === 1
                  ? t("ErrorDuringRegister")
                  : t("ErrorDuringLogin")
              }`
          );
          return;
        }
        const decodedJWT: any = jwtDecode(res.data.token);
        toast(
          selectedTab.tab === 1
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
          selectedTab.tab === 1
            ? t("ErrorDuringRegister")
            : t("ErrorDuringLogin")
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
            "--tw-gradient-from": "#e7e9ff",
            "--tw-gradient-to": "#fbdffc",
            backgroundSize: "150% 150%",
            animation: `${moveGradient} 5s ease infinite`,
          },
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab.tab}
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
                  fontWeight: 600,
                }}
              >
                {selectedTab.tab === 1
                  ? t("RegisterToShareScore")
                  : t("LoginToShareScore")}
              </Typography>
            </DialogContentText>

            <TextField
              inputProps={{
                autoComplete: "off",
                style: { fontWeight: 500 },
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
              inputProps={{
                autoComplete: "off",
                style: { fontWeight: 500 },
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
                  selectedTab.tab === 1 ? (
                    <FontAwesomeIcon icon={faPenNib} className="fa-xl" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      className="fa-xl"
                    />
                  )
                }
                text={selectedTab.tab === 1 ? t("Register") : t("Login")}
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
