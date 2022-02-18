import { useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isCurrent = true;
    netlifyIdentity.on("login", (user) => {
      if (isCurrent) setUser(user);
    });

    return () => {
      isCurrent = false;
      netlifyIdentity.off("login");
    };
  }, []);

  return user ? (
    <div>
      You are logged in!
      <div>Welcome {user?.user_metadata?.full_name ?? "NoName"}!</div>
      <br />
      <button
        className="uk-button uk-button-danger"
        onClick={() => netlifyIdentity.logout()}
      >
        Log out
      </button>
    </div>
  ) : (
    <button
      className="uk-button uk-button-primary"
      onClick={() => netlifyIdentity.open()}
    >
      Log in
    </button>
  );
}
