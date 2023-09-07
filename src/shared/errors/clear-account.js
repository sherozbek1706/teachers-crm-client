
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
