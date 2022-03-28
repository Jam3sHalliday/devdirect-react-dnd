import { createContext, useState } from "react";

export const DragDropContext = createContext({
    consumerDrop: [],
    setConsumerDrop: () => null
});

export const DragDropProvider = ({ children }) => {
    const [consumerDrop, setConsumerDrop] = useState([]);
    const value = { consumerDrop, setConsumerDrop }

    return <DragDropContext.Provider value={value}>
        { children }
    </DragDropContext.Provider>
}