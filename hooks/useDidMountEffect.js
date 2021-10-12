import {useEffect, useRef} from 'react';

const useDidMountEffect = (func, dependencies) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
        // eslint-disable-next-line
    }, dependencies);
}

export default useDidMountEffect;