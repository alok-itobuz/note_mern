import showAlert from "./showAlert";

export function handleError(message, state, setState, navigate) {
    switch (message) {
        case "Token is expired.":
            setState(null)
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
            navigate('/auth')
            break;
        case "Invalid email":
        case "Invalid password":
            showAlert('Error', 'Invalid email or password', 'error')
            break;
    }
}