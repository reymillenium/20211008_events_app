import MainNavigation from './MainNavigation/MainNavigation';
import styles from './Layout.module.css';
import FooterClassic from "../FooterClassic/FooterClassic";
import PageHead from "../ui/PageHead";

function Layout(props) {
    const hideNavigation = props.hideNavigation || false;
    const navigation = (hideNavigation ? null : <MainNavigation/>);

    return (
        <>
            <PageHead headInfo={props.headInfo}/>
            <div>
                {navigation}
                <main className={styles.main}>{props.children}</main>
                <FooterClassic/>
            </div>
        </>
    );
}

export default Layout;
