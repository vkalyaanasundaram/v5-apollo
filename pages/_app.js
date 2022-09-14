import { ApolloProvider } from "@apollo/client/react";
import { client } from "../lib/apollo";
import '../styles/globals.css'
import '../styles/main.scss';
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
