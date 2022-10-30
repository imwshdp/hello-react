import { useRef, useEffect } from "react";

export const useObserver = (ref, canLoad, isLoading, refCallback) => {
    const observer = useRef()

    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();

        var callback = function(entries, observer) {
            // если попадает в зону видимости
            if(entries[0].isIntersecting && canLoad) {
                refCallback();
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(ref.current);
    }, [isLoading])
}