const helper = require('../utils/helpers');

/**
 * @function generateButton - generate button list as a poll point
 * 
 * @returns {Array} buttonList - all number from 1 to 5 exdept 4
 */

const generateButton = () => {
    const buttonList = [];
    for (let i = 1; i < 6; i++) {
        if (i !== 4) buttonList.push(i);
    };
    return buttonList;
}

/**
 * @function handlePollpoint - check for the current poll point and do upsert operation
 * 
 * @param {String} pointValue - poll pont value
 * @param {Int} ticketNumber - ticket number
 * @param {Array} payloadDataList - list of payload to be sent to the backend
 * 
 * @returns {Array} data - list of payload data with updated poll point
 */

const handlePollpoint = (pointValue, ticketNumber, payloadDataList) => {
    const result = payloadDataList.map(data => {
        if (data.ticketNumber === ticketNumber) {
            if (data.pollPoint !== pointValue) {
                return { ...data, pollPoint: pointValue }
            } else {
                return { ...data, pollPoint: 0 }
            }
        }
        return data;
    });

    return result;
}

const addPoll = (sprintName, url, point, commentList) => {
    const data = {};
    data.sprintName = sprintName;
    data.ticketNumber = url.split('/').pop();
    data.pollUrl = url;
    data.pollPoint = point;
    data.pollComment = commentList;
    data.pollCreatedOn = new Date().toLocaleString();
    data.pollCreatedBy = 'pushp';

    return data;
}

module.exports = { generateButton, addPoll, handlePollpoint }