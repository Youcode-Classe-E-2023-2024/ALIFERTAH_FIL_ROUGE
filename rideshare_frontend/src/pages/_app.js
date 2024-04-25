import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";


export default function App({ Component, pageProps }) {
  const pagesWithoutLayout = ['Login'];
  const shouldHaveLayout = !pagesWithoutLayout.includes(Component.displayName || Component.name)
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  useEffect(() => {

     router.events.on("routeChangeStart", () => {
          setProgress(40);
        });
    
     router.events.on("routeChangeComplete", () => {
          setProgress(100);
        });
    
    }, []);
    
  return shouldHaveLayout ? (
      <Layout>
        <LoadingBar color="rgb(52, 103, 81)" progress={progress} waitingTime={400}/>
        <Component {...pageProps} />
      </Layout>
  ) : (
    <Component {...pageProps} />
  )
    
}
