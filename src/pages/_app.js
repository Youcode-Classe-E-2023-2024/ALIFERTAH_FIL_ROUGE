import Layout from "@/components/layout/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const pagesWithoutLayout = ['login'];
  const shouldHaveLayout = !pagesWithoutLayout.includes(Component.displayName || Component.name)
  
  return shouldHaveLayout ? (
      <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
    
}
