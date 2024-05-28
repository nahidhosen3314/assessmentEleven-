import { useEffect } from "react";

const useTitle = ({ title }) => {
    useEffect(() => {
        document.title = `shareBite | ${title}`;
    }, [title]);
};

export default useTitle;
