
function paramsToObject(entries: any) {
    const result: any = {}
    for (const [key, value] of entries) {
        result[key] = value;
    }
    return result;
}

export {
    paramsToObject
}