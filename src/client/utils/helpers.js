const chckForDuplicatePoll = (currentUrl, data) => {
    let callback;

    data.forEach(element => {
        if (element.pollUrl === currentUrl) {
            callback = true;
            return callback
        } else {
            callback = false;
            return callback;
        }
    });

    return callback;
}

module.exports = { chckForDuplicatePoll }