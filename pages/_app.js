import '../styles/globals.css'
import Layout from "../components/Layout/Layout";
import generateHeadInfo from "../tools/generateHeadInfo";

function MyApp({Component, pageProps}) {
    const headInfo = generateHeadInfo(Component.name, pageProps);

    return (
        <Layout
            hideNavigation={Component.name === 'Error404'}
            headInfo={headInfo}
        >
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp
