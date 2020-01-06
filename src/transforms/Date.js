const formatDate = (date) => {
    const _date = new Date(date);
    let dd = _date.getDate();
    let mm = _date.getMonth() + 1;

    const yyyy = _date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

export default formatDate;