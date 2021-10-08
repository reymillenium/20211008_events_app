import Head from "next/head";

const PageHead = (props) => {
    const headInfo = props.headInfo || {};

    return (
        <>
            <Head>
                <title>{headInfo.title}</title>
                <meta name={"description"} content={`${headInfo.description}`}/>
                <link rel="shortcut icon" href="/portflio-logo-transparent-bg_678_x_336.png"/>
            </Head>
        </>
    );
};

export default PageHead;