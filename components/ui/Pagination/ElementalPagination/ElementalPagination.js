import {useState, Fragment, useEffect, useCallback} from "react";
import styles from './ElementalPagination.module.css';

const ElementalPagination = (props) => {
    console.log(props.items);
    const {items: initialTotalItems} = props;
    const initialState = {
        items: initialTotalItems,
        currentPage: props.currentPage || 1,
        itemsPerPage: props.itemsPerPage || 5,
        renderedItems: [],
        renderedPageNumbersListItems: [],
    };
    const [state, setState] = useState(initialState);
    const {items, currentPage, itemsPerPage, renderedItems, renderedPageNumbersListItems} = state;

    // Logic to display the paginated items:
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const clickOnPageHandler = (event) => {
        setState(prevState => {
            return (
                {
                    ...prevState,
                    currentPage: Number(event.target.id)
                }
            );
        });
    };

    const getRenderedItems =  useCallback( (currentItems) => {
        return currentItems.map((item, index) => {
            return (
                <Fragment key={index}>
                    {item}
                </Fragment>
            );
        });
    }, []);

    const getRenderedPageNumbersListItems = useCallback((totalItems) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalItems.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={clickOnPageHandler}
                    style={{color: `${number === currentPage ? 'red' : 'blue'}`}}
                >
                    {number}
                </li>
            );
        });


    }, [currentPage, itemsPerPage]);

    useEffect(  () =>  {
        const currentItems =  initialTotalItems.slice(indexOfFirstItem, indexOfLastItem);
        const renderedItems =  getRenderedItems(currentItems);
        console.log('ElementalPagination->useEffect->renderedItems = ', renderedItems);
        setState(prevState => {
            return (
                {
                    ...prevState,
                    renderedItems: renderedItems,
                }
            );
        });

        const pageNumbersListItems = getRenderedPageNumbersListItems(initialTotalItems);
        setState(prevState => {
            return (
                {
                    ...prevState,
                    renderedPageNumbersListItems: pageNumbersListItems,
                }
            );
        });

    }, [initialTotalItems, items, getRenderedItems, getRenderedPageNumbersListItems, indexOfFirstItem, indexOfLastItem])

    let paginatorBar = (
        <ul className={styles.PageNumbers}>
            {renderedPageNumbersListItems}
        </ul>
    );

    return (
        <Fragment>
            {paginatorBar}
            {/*{renderItems}*/}
            {renderedItems}
            {paginatorBar}
        </Fragment>
    );

};

export default ElementalPagination;