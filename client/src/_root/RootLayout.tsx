// This component is for generalizing the layout of the main website pages

import { Button } from "../components";
import { useAuth } from "../lib/context/AuthContext";

const RootLayout = () => {
  const { logout } = useAuth();

  const handleClick = async () => {
    await logout();
  }

  return <div>
    <Button type="button" onClick={handleClick}>
      Logout
    </Button>
  </div>;
};

export default RootLayout;
