import Head from "next/head";

const PageHead = (props) => {
    const headInfo = props.headInfo || {};

    return (
        <>
            <Head>
                <title>{headInfo.title}</title>
                <meta name={"description"} content={`${headInfo.description}`}/>
                <link rel="shortcut icon" href="/event_started_checked_logo_290_x_290.png"/>
            </Head>
        </>
    );
};

export default PageHead;