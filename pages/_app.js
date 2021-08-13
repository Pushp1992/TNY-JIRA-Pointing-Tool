import { AuthProvider } from '../src/server/auth/auth';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
}

export default MyApp
