export default function validateInfo(values) {
let errors = {};

// Username
if (!values.name.trim()) {
  errors.name = "Name required!";
}

// Email
if (!values.email) {
  errors.email = "Email required!";
} else if (!/\S+@\S+\.\S+/.test(values.email)) {
  errors.email = "Email address is invalid!";
}

// Password
if (!values.password) {
  errors.password = "Password required!";
} else if (values.password.length < 8) {
  errors.password = "Password needs to be 8 characters or more!"
}

// Confirm Password
if (!values.password2) {
  errors.password2 = "Password required!";
} else if (values.password2 !== values.password) {
  errors.password2 = "Passwords do not match";
}

return errors;
};