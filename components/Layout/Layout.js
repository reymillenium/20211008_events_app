// import MainNavigation from './MainNavigation/MainNavigation';
import MainNavigationEvents from "./MainNavigationEvents/MainNavigationEvents";
import styles from './Layout.module.css';
import FooterClassic from "../FooterClassic/FooterClassic";
import PageHead from "../ui/PageHead";

function Layout(props) {
    const hideNavigation = props.hideNavigation || false;
    // const navigation = (hideNavigation ? null : <MainNavigation/>);
    const navigation = (hideNavigation ? null : <MainNavigationEvents/>);

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
