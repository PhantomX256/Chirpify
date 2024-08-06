// Function to check if password has 8 to 32 characters
const validatePassword = (password) => {
  return password.length >= 8 && password.length <= 32;
};

// Function to check if username has more than 6 characters
const validateUsername = (username) => {
  return username.trim().length >= 6;
};

// Function to check if the name is not just whitespace
const validateName = (name) => {
  return name.trim().length > 0;
};

// Function to validate all sign-up credentials
export const validateSignUpCredentials = (
  name,
  username,
  password,
  confirmPassword,
  res
) => {
  // Validate password
  if (!validatePassword(password)) {
    res
      .status(400)
      .json({ error: "Password must contain between 8 to 32 characters" });
    return false;
  }

  // Validate username
  if (!validateUsername(username)) {
    res
      .status(400)
      .json({ error: "Username must contain more than 6 characters" });
    return false;
  }

  // Validate name
  if (!validateName(name)) {
    res.status(400).json({ error: "Name cannot be empty" });
    return false;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match" });
    return false;
  }

  // All validations passed
  return true;
};
