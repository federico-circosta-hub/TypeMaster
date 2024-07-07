import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import {
  Box,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../lib/features/accountSlice";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation, useRegisterMutation } from "../services/authApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegisterDialog = ({ setOpenRegisterDialog = () => {}, tab = 1 }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState(tab);
  const [nameConfirmation, setNameConfirmation] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);

  const [registerUser] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

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
              `Error during ${selectedTab === 1 ? "registration" : "login"}`
          );
          return;
        }
        const decodedJWT = jwtDecode(res.data.token);
        toast(
          selectedTab === 1
            ? "✨ Registrato con successo! ✨"
            : `✨ Bentornato ${decodedJWT.username}! ✨`,
          {
            theme: "light",
          }
        );
        dispatch(setUser({ jwt: res.data.token, ...decodedJWT }));
        handleClose();
      })
      .catch(() => {
        `Error during ${selectedTab === 1 ? "registration" : "login"}`;
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
          sx: { borderRadius: "10px", padding: 4 },
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Registrati" value={1} />
            <Tab label="Login" value={2} />
          </Tabs>
        </Box>
        <Box>
          <DialogContent className="flex flex-col gap-6">
            <DialogContentText id="alert-dialog-slide-description">
              {`${
                selectedTab === 1 ? "Registrati" : "Accedi"
              } per condividere e tenere traccia dei tuoi punteggi`}
            </DialogContentText>
            <TextField
              className="focus:shadow-lg focus:shadow-orange-600/50"
              inputProps={{
                autoComplete: "off",
              }}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
            {(nameConfirmation || selectedTab === 2) && (
              <TextField
                onChange={handleChange}
                autoFocus
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
            )}
          </DialogContent>
          <DialogActions>
            {nameConfirmation || selectedTab === 2 ? (
              <Button
                disabled={!formData?.name || !formData?.password}
                type="submit"
                onClick={handleSubmit}
              >
                {selectedTab === 1 ? "Registrati" : "Accedi"}
              </Button>
            ) : (
              <Button
                disabled={!formData?.name}
                onClick={() => setNameConfirmation(true)}
              >
                Conferma
              </Button>
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default RegisterDialog;
