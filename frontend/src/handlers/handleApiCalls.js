import axios from "axios";
import showAlert from "./showAlert";
import { handleError } from "./handleErros";

export const handleAuthenticate = async (event, state, setState, isRegister, setIsRegister, isRemember, navigate) => {
    try {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let axiosData = {
            email: formData.get("email"),
            password: formData.get("password"),
            isRemember,
        };

        if (isRegister) axiosData = { ...axiosData, name: formData.get("name") };

        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_BASE_URL}/user/${isRegister ? "register" : "login"
                }`,
            data: axiosData,
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!isRegister) {
            if (isRemember) {
                localStorage.setItem(
                    "authToken",
                    JSON.stringify(response.data.data.token)
                );
            }
            setState({
                ...state,
                user: response.data.data.user,
                token: response.data.data.token,
                isRemember,
            });
            navigate("/");
        } else {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            setIsRegister(false);
        }
    } catch (error) {
        console.log("login error", error);
        handleError(error.response.data.message);
    }
};

export const handleUpdateUser = async (e, state, setState, setIsEdit, toggleDrawer) => {
    try {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email").trim();
        const name = formData.get("name").trim();

        console.log({ name, email, notName: !name, notEmail: !email })
        if (!name && !email) {
            showAlert("Error", "Both fields can't be empty.", "error")
            return;
        }

        let axiosData = {};
        if (email) axiosData = { ...axiosData, email };
        if (name) axiosData = { ...axiosData, name };

        await axios({
            method: "patch",
            url: `${import.meta.env.VITE_BASE_URL}/user/`,
            data: axiosData,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state?.token}`,
            },
        });


        setState({ ...state, user: { ...state?.user, ...axiosData } });
        localStorage.setItem('user', JSON.stringify({ ...state?.user, axiosData }))

        toggleDrawer(false)(e);

        showAlert("Success", "Your profile is updated.", "success")
        setIsEdit(false);
    } catch (error) {
        console.log("update user error", error);

        showAlert("Error", "Error updating user data.", "error")
    }
};

export const handleLogout = async (state, setState, navigate) => {
    try {
        await axios({
            method: "delete",
            url: `${import.meta.env.VITE_BASE_URL}/user/logout`,
            headers: {
                Authorization: `Bearer ${state?.token}`,
            },
        });
        setState(null);
        showAlert("Success", "Logout successfully", "success")

        navigate("/auth");
    } catch (error) {
        showAlert("Error", "Error logging out.", "error")
    }
};


export const handleLogoutAll = async (state, setState, navigate) => {
    try {
        await axios({
            method: "delete",
            url: `${import.meta.env.VITE_BASE_URL}/user/logout-all`,
            headers: {
                Authorization: `Bearer ${state?.token}`,
            },
        });
        setState(null);
        showAlert("Success", "Logout successfully", "success")
        navigate("/auth");
    } catch (error) {
        showAlert("Error", "Error logging out.", "error")
        console.log(error);
    }
};

export const fetchUserDetails = async (state, setState) => {
    try {
        const token = JSON.parse(localStorage.getItem("authToken"));
        const response = await axios({
            method: "get",
            url: `${import.meta.env.VITE_BASE_URL}/user`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        setState({
            ...state,
            user: response.data.data.user,
            token: response.data.data.token,
        });
    } catch (error) {
        console.log("fetch user details", error);
    }
};

export const createOrUpdateNote = async (
    state,
    title,
    description,
    isCreate,
    id
) => {
    try {
        let axiosData = {};
        if (title) axiosData = { ...axiosData, title };
        if (description) axiosData = { ...axiosData, description };

        const response = await axios({
            method: isCreate ? "post" : "patch",
            url: `${import.meta.env.VITE_BASE_URL}/note/${!isCreate ? id : ""}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state?.token}`,
            },
            data: axiosData,
        });

    } catch (error) {
        console.log("create note error", error);
    }
};

export const fetchNotes = async (state, setState, query, navigate) => {
    try {
        const response = await axios({
            method: "get",
            url: `${import.meta.env.VITE_BASE_URL}/note${query}`,
            headers: {
                Authorization: `Bearer ${state?.token}`,
            },
        });

        setState({ ...state, notes: response.data.data.notes });
    } catch (error) {
        handleError(error.response.data.message, state, setState, navigate);
    }
};

export const hideNotes = async (state, setState, selectedNotes, setSelectedNotes, setHideCheckbox, isCurrentPageHidden) => {
    try {
        if (selectedNotes.length === 0) {
            return showAlert("Error", "Select atleast 1 note", "error");
        }

        await axios({
            method: "patch",
            url: `${import.meta.env.VITE_BASE_URL}/note`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state?.token}`,
            },
            data: {
                idArray: selectedNotes,
                isHidden: !isCurrentPageHidden,
            },
        });

        fetchNotes(
            state,
            setState,
            isCurrentPageHidden
                ? "?search[isHidden]=true"
                : "?search[isHidden]=false"
        );

        setSelectedNotes([]);
        setHideCheckbox(true);
    } catch (error) {
        console.log("make hidden error", error);
    }
};

export const deleteNote = async (state, id) => {
    try {
        const response = await axios({
            method: "delete",
            url: `${import.meta.env.VITE_BASE_URL}/note/${id}`,
            headers: {
                Authorization: `Bearer ${state?.token}`,
            },
        });

    } catch (error) {
        handleError(error.response.data.message, state, setState, navigate);
    }
}