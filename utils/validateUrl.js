const validateUrl = (url) => {
    try {
        return new URL(url);
    }
    catch {
        return null;
    }
}


export default validateUrl;