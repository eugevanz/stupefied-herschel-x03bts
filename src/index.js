import ReactDOM from "react-dom";

import App from "./App";

// import registerServiceWorker from './registerServiceWorker';
import netlifyIdentity from "netlify-identity-widget";

// window.netlifyIdentity = netlifyIdentity;
// You must run this once before trying to interact with the widget
netlifyIdentity.init({
  APIUrl: 'https://loving-brattain-c7b41f.netlify.app/.netlify/identity',
  namePlaceholder: 'Your full name',
  locale: 'en'
});

ReactDOM.render(<App />, document.getElementById('root'));
