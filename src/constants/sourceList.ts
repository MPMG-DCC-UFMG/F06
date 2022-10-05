export const sourceList: SourceListItem[] = [
    {
        color: "text-red-600",
        colorHex: "rgb(220, 38, 38)",
        name: "Procon-MG",
        key: "procon"
    },
    {
        color: "text-blue-600",
        colorHex: "rgb(37, 99, 235)",
        name: "Consumidor.gov.br",
        key: "consumidor_gov"
    },
    {
        color: "text-green-600",
        colorHex: "rgb(22, 163, 74)",
        name: "Reclame Aqui",
        key: "reclame_aqui"
    }
]

export type SourceListItem = {
    color: string;
    colorHex: string;
    name: string;
    key: string;
}