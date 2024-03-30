export function handleError(message, state, setState, navigate) {
    switch (message) {
        case "Token is expired.":
            setState(null)
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
            navigate('/auth')
            break;
    }
}