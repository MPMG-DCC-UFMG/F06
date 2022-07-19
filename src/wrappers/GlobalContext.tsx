import react, { useState } from "react";

interface globalContextInterface {
    example: null,
    setExample: react.Dispatch<any>
};

export const GlobalStateContext = react.createContext<globalContextInterface | null>(null);

type Props = {
    children: JSX.Element
}

function GlobalContext({ children }: Props) {
    const [example, setExample] = useState<any>(null);

    return <GlobalStateContext.Provider value={{ example, setExample }}>
        {children}
    </GlobalStateContext.Provider>
}

export default GlobalContext;