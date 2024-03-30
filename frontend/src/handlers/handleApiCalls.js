import axios from "axios";
import showAlert from "./showAlert";

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

        setState({
            ...state,
            user: response.data.data.user,
            token: response.data.data.token,
        });
        localStorage.setItem("user", response.data.data.user);
    } catch (error) {
        console.log("fetch user details", error);
    }
};