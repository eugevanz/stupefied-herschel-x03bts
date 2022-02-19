import { useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";
import { QueryClient, QueryClientProvider } from "react-query";

import { Main } from "./Main";

export default function App() {
  const [user, setuser] = useState(netlifyIdentity.currentUser());

  const queryClient = new QueryClient();

  useEffect(() => {
    let isCurrent = true;
    netlifyIdentity.on("login", (user) => {
      if (isCurrent) setuser(user);
    });

    netlifyIdentity.on("logout", () => setuser(null));

    return () => {
      isCurrent = false;
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  if (!user) return <LoginPage></LoginPage>;

  return (
    <QueryClientProvider client={queryClient}>
      <Main user={user}></Main>
    </QueryClientProvider>
  );
}

function LoginPage() {
  return (
    <div className="uk-margin-right uk-margin-left uk-width-1-4@m uk-margin-top uk-margin-large-bottom">
      <button
        className="uk-button uk-button-primary uk-button-large"
        onClick={() => netlifyIdentity.open()}
      >
        Log in here
      </button>
    </div>
  );
}
