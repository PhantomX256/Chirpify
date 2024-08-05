// Importing libraries
import { CSSProperties, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// Importing necessary lib functions
import { validateSignUpCredentials } from "../../lib/validation";

// Importing Components
import { TailSpin } from 'react-loader-spinner'
import { Input, Button } from "../../components";


const SignUpFrom: React.FC = () => {
  // Form information hooks
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // declaring all the styles for this form
  const errorStyles: CSSProperties = {
    color: '#8a6029',
    fontSize: '18px',
    fontWeight: '600',
    fontFamily: 'Montserrat',
    textAlign: 'center'
  }

  // Function to handle submit
  const handleSubmit = (e: FormEvent) => {
    setLoading(true);
    // prevent default submission
    e.preventDefault();

    // check all the credentials
    if(validateSignUpCredentials(name, username, password, confirmPassword, setError)) {
      console.log(`Name: ${name}\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}\nConfirm Password: ${confirmPassword}`);
      setError('');
    }
    setLoading(false);
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '350px' }} onSubmit={handleSubmit}>
      {/* Heading */}
      <h2 style={{ textAlign: 'center', color: '#EEEEEE', fontFamily: 'Work Sans', fontSize: '30px' }}>Create an Account</h2>

      {/* Input Fields */}
      <Input label="Name" type="text" value={name} name="name" setState={setName} placeholder="" />
      <Input label="Username" type="text" value={username} name="username" setState={setUsername} placeholder="" />
      <Input label="Email" type="email" value={email} name="email" setState={setEmail} placeholder="" />
      <Input label="Password" type="password" value={password} name="password" setState={setPassword} placeholder="" />
      <Input label="Confirm Password" type="password" value={confirmPassword} name="confirmPassword" setState={setConfirmPassword} placeholder="" />

      {/* If there is any error in the inputs it will be displayed here */}
      {error && (<span style={errorStyles}>{error}</span>)}

      {/* Submit button */}
      <Button type="submit">{loading ? <TailSpin width='20px' height='20px' /> : 'Submit'}</Button>

      {/* If the user already has an account */}
      <p style={{ color: '#EEEEEE', fontFamily: 'Montserrat' }}>Already have an account? <Link style={{ textDecoration: 'none' }} to="/sign-in">Sign In</Link></p>
    </form>
  );
};

export default SignUpFrom;