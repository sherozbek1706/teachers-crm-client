import { errorNot } from "../toastfy";

export const HandleFetchError = (err) => {
  if (err.response) {
    const error = err.response.data.error;

    switch (error) {
      case "jwt expired":
        jwt_expired();
        break;

      case "This user is not allowed this right!":
        not_allow();
        break;

      case "invalid signature":
        invalid_signature();
        break;

      default:
        errorNot(error);
    }
  }
};

const not_allow = () => {
  window.location.assign("/");
};

const jwt_expired = () => {
  localStorage.clear();
  errorNot("Sizning Token Eskirgan!");
  setTimeout(() => {
    window.location.assign("/");
  }, 1200);
};

const invalid_signature = () => {
  localStorage.clear();
  errorNot("Sizning Token Noto'g'ri!");
  setTimeout(() => {
    window.location.assign("/");
  }, 1200);
};
