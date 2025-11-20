const addParams = (target, params) => {
    for(const [key, value] of Object.entries(params)) {
        if(value !== undefined && value !== null) {
            target.searchParams.set(key, String(value))
        }
    }

    return target;
}

export default addParams;