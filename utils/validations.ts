export function passwordValidation(password: string) {
  if (password.length < 8) {
    return false;
  }

  if (password.length > 24) {
    return false;
  }

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,24}$/;

  if (!regex.test(password)) {
    return false;
  }

  return true;
}
