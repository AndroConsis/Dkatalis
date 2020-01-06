const headers = () => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
};

export const getMultipleUsers = () => {
    const url = `https://randomuser.me/api/?results=20`;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: headers(),
        })
            .then(response => response.json())
            .then(responseJson => {
                const results = responseJson.results;
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
};