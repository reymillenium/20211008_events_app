import '../styles/globals.css'
import Layout from "../components/Layout/Layout";
import generateHeadInfo from "../tools/generateHeadInfo";

// Fontawesome:
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fab } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-free/css/all.css';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(fab);

// FontAwesome Animation:
import 'font-awesome-animation/font-awesome-animation.scss';

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
