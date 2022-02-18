import { useState } from 'react';
import IdentityModal, {
  useIdentityContext,
  IdentityContextProvider
} from 'react-netlify-identity-widget';

function AuthStatusView() {
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);
  const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || 'NoName';

  const isLoggedIn = identity && identity.isLoggedIn;

  return (<div>
    <div>
      <button className="RNIW_btn" onClick={ () => setDialog(true) }>
        { isLoggedIn ? `Hello ${ name }, Log out here!` : 'Log In' }
      </button>
    </div>
    <IdentityModal
      showDialog={ dialog }
      onCloseDialog={ () => setDialog(false) }
      onLogin={ (user) => console.log('hello ', user.user_metadata) }
      onSignup={ (user) => console.log('welcome ', user.user_metadata) }
      onLogout={ () => console.log('bye ', name) }
    />
  </div>);
}

export default function App() {
  const url = "https://loving-brattain-c7b41f.netlify.app";

  return (<IdentityContextProvider url={ url }>
    <AuthStatusView></AuthStatusView>
  </IdentityContextProvider>);
}
