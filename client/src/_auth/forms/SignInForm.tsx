// Importing necessary librariess
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// Importing necessary components
import { TailSpin } from "react-loader-spinner";
import { Input } from "../../components";
import { Button } from '../../components';
import { useAuth } from "../../lib/context/AuthContext";

const SignInForm = () => {
  // Declaring form hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, serverError } = useAuth();

  // function to handle submit
  const handleSubmit = async (e: FormEvent) => {
    try {
      // set loading to true
      setLoading(true);

      // prevent default credentials
      e.preventDefault();

      // call login
      await login(email, password);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <form className="auth-form-container" onSubmit={handleSubmit}>
      {/* Heading */}
      <h2 style={{ textAlign: 'center', color: '#EEEEEE', fontFamily: 'Work Sans', fontSize: '1.7rem' }}>Log In</h2>

      {/* Input Fields */}
      <Input label="Email" type="email" value={email} name="email" setState={setEmail} placeholder="" />
      <Input label="Password" type="password" value={password} name="email" setState={setPassword} placeholder="" />

      {/* Error field */}
      { serverError && <span className="error">{serverError}</span> }

      {/* Submit Button */}
      <Button className="btn" type="submit">{loading ? <TailSpin width='20px' height='20px' /> : 'Submit'}</Button>

      {/* If the user already has an account */}
      <p className="auth-redirect">Don't have an account? <Link style={{ textDecoration: 'none' }} to="/sign-up">Sign Up</Link></p>

    </form>
  );
};

export default SignInForm;
