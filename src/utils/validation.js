import emailValidator from "deep-email-validator";

function isEmpty(value) {
  return !value || value.trim() == "";
}

function userCredentialsAreValid(email, password) {
  return email && email.includes("@") && password && password.trim().length > 4;
}

function userDetailsAreValid(email, password, confirmPassword, name, phone) {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(phone) &&
    !isEmpty(password) &&
    !isEmpty(confirmPassword)
  );
}

function passwordIsConfirmed(password, confirmPassword) {
  return password === confirmPassword;
}

export { userDetailsAreValid, passwordIsConfirmed };
