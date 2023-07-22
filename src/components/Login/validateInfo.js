export default function validateInfo(values) {
    let errors = {};
  
    // Username
    if (!values.email) {
      errors.email = "Email required!";
    }

    // Password
    if (!values.password) {
      errors.password = "Password required!";
    }
  
    return errors;
  };