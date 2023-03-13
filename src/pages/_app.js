import '@/styles/globals.css'
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="text-black dark:text-white bg-[#f3f3f3] dark:bg-[#151515] flex flex-row w-full h-full min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  )
}
