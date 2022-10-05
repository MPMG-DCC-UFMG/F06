import react, { useState } from "react";
import { Endpoint } from "../constants/endpoints";
import useFetch from "../hooks/useFetch";

interface globalContextInterface {
    proconCategories?: ICategories[],
    sourceValues: string[],
    setSourceValues: react.Dispatch<react.SetStateAction<string[]>>
    searchDate: { start?: string, end?: string },
    setSearchDate: react.Dispatch<react.SetStateAction<any>>
    categories: string[],
    setCategories: react.Dispatch<react.SetStateAction<string[]>>
    city: string,
    setCity: react.Dispatch<react.SetStateAction<string>>
    order: string,
    setOrder: react.Dispatch<react.SetStateAction<string>>
};

export const GlobalStateContext = react.createContext<globalContextInterface>({} as globalContextInterface);

type Props = {
    children: JSX.Element
}

function GlobalContext({ children }: Props) {
    const [sourceValues, setSourceValues] = useState<string[]>(["procon", "reclame_aqui", "consumidor_gov"]);
    const [searchDate, setSearchDate] = useState<{ start?: string, end?: string }>({});
    const [categories, setCategories] = useState<string[]>([]);
    const [city, setCity] = useState<string>("");
    const [order, setOrder] = useState<string>("relevancia_asc");

    const { data: proconCategories } = useFetch<ICategories[]>(Endpoint.ProconCategories);

    return <GlobalStateContext.Provider value={{
        proconCategories: proconCategories || [],
        sourceValues, setSourceValues,
        searchDate, setSearchDate,
        categories, setCategories,
        city, setCity,
        order, setOrder
    }}>
        {children}
    </GlobalStateContext.Provider>
}

export default GlobalContext;