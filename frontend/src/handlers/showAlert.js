
import Swal from "sweetalert2";

export default function (title, text, icon) {
    Swal.fire({
        title,
        text,
        icon,
        customClass: {
            container: "my-swal",
        },
    });
}