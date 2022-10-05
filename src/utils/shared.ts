
function paramsToObject(entries: any) {
    const result: any = {}
    for (const [key, value] of entries) {
        result[key] = value;
    }
    return result;
}

function formatDate(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString();
}

export {
    paramsToObject,
    formatDate
}