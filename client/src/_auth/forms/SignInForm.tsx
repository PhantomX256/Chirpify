// Importing necessary librariess
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// Importing necessary components
import { TailSpin } from "react-loader-spinner";
import { Input } from "../../components";
import { Button } from '../../components';

const SignInForm = () => {
  // Declaring form hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // function to handle submit
  const handleSubmit = (e: FormEvent) => {
    setLoading(true);
    // prevent default credentials
    e.preventDefault();

    setTimeout(() => {
      setLoading(false);
      alert('Success');
    }, 2000);
  }
  
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '350px' }} onSubmit={handleSubmit}>
      {/* Heading */}
      <h2 style={{ textAlign: 'center', color: '#EEEEEE', fontFamily: 'Work Sans', fontSize: '30px' }}>Log In</h2>

      {/* Input Fields */}
      <Input label="Email" type="email" value={email} name="email" setState={setEmail} placeholder="" />
      <Input label="Password" type="password" value={password} name="email" setState={setPassword} placeholder="" />

      {/* Submit Button */}
      <Button type="submit">{loading ? <TailSpin width='20px' height='20px' /> : 'Submit'}</Button>

      {/* If the user already has an account */}
      <p style={{ color: '#EEEEEE', fontFamily: 'Montserrat' }}>Don't have an account? <Link style={{ textDecoration: 'none' }} to="/sign-up">Sign Up</Link></p>

    </form>
  );
};

export default SignInForm;
