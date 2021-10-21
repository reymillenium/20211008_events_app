import Head from "next/head";

const PageHead = (props) => {
    const headInfo = props.headInfo || {};

    return (
        <Head>
            <title>{headInfo.title}</title>

            <meta property="og:type" content="website"/>
            <meta name="og:title" property="og:title" content={headInfo.title}/>
            <meta name={"description"} content={`${headInfo.description}`}/>
            <meta name={'viewport'} content={'initial-scale=1.0, with=device-width'}/>
            <meta property="og:site_name" content="Proper Noun"/>
            <meta charSet="utf-8"/>

            <link rel="shortcut icon" type={'image/png'} sizes={"16x16"} href="/event_started_checked_logo_wine_290_x_290.png"/>
            <link rel="apple-touch-icon" href="/event_started_checked_logo_wine_290_x_290.png"/>
        </Head>
    );
};

export default PageHead;