import Layout from "@/components/layout/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const pagesWithoutLayout = ['Login'];
  const shouldHaveLayout = !pagesWithoutLayout.includes(Component.displayName || Component.name)
  
  return shouldHaveLayout ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  )
    
}
