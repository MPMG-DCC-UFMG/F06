export const sourceList: SourceListItem[] = [
    {
        color: "text-red-600",
        name: "Procon-MG",
        key: "procon"
    },
    {
        color: "text-blue-600",
        name: "Consumidor.gov.br",
        key: "consumidor_gov"
    },
    {
        color: "text-green-600",
        name: "Reclame Aqui",
        key: "reclame_aqui"
    }
]

export type SourceListItem = {
    color: string;
    name: string;
    key: string;
}