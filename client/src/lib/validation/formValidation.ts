// Function to check if password has 8 to 32 characters
const validatePassword = (password: string): boolean => {
  return password.length >= 8 && password.length <= 32;
};

// Function to check if username has more than 6 characters
const validateUsername = (username: string): boolean => {
  return username.trim().length >= 6; 
};

// Function to check if the name is not just whitespace
const validateName = (name: string): boolean => {
  return name.trim().length > 0;
};

// Function to check if the passwords match
const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

// Type for the setError callback
type SetError = (error: string) => void;

// Function to validate all sign-up credentials
export const validateSignUpCredentials = (
  name: string,
  username: string,
  password: string,
  confirmPassword: string,
  setError: SetError
): boolean => {

  // Validate password
  if (!validatePassword(password)) {
    setError("Password must contain between 8 to 32 characters");
    return false;
  }

  // Validate username
  if (!validateUsername(username)) {
    setError("Username must contain exactly 6 characters");
    return false;
  }

  // Validate name
  if (!validateName(name)) {
    setError("Name cannot be empty");
    return false;
  }

  // Check if passwords match
  if (!validatePasswordMatch(password, confirmPassword)) {
    setError("Passwords do not match");
    return false;
  }

  // All validations passed
  return true;
};
