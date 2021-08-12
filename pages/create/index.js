import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/Create.module.css';

const createPollService = require('../../src/client/service/create-poll');

const helper = require('../../src/client/utils/helpers');

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const CreatePoll = () => {
    const classes = useStyles();

    const [showCreateForm, setShowCreateForm] = useState(true);
    const [sprintName, setSprintName] = useState("");
    const [url, setUrl] = useState('');
    const [point, setPoint] = useState(0);
    const [commentList, setCommentlist] = useState([]);
    const [payloadDataList, setPayloadDataList] = useState([]);

    useEffect(() => {
        createPoll();
    }, [payloadDataList, commentList]);

    const buttonList = createPollService.generateButton();

    const addCurrentPollToPayload = async (e) => {
        e.preventDefault();

        const isDuplicatePoll = helper.chckForDuplicatePoll(url, payloadDataList);

        if (isDuplicatePoll) {
            window.alert('duplicate poll');
            return false;
        };

        const payloadData = await createPollService.addPoll(sprintName, url, point, commentList);
        setPayloadDataList(previtem => [...previtem, payloadData]);
    };

    const handlePollPointing = (e, pointValue, ticketNumber) => {
        e.preventDefault();

        const result = createPollService.handlePollpoint(pointValue, ticketNumber, payloadDataList);
        setPayloadDataList(result);
    };

    const createPoll = (e) => {
        // pass payloadDataList as a POST request

        // with some minor validation.

        // await callPOSTApi();

        // e.preventDefault();
        console.log("create poll", payloadDataList)
    };

    return (
        <div className={styles.main}>
            <div className={styles.addCard}>
                <TextField
                    id="outlined-secondary"
                    label="Enter Sprint Name"
                    color="primary"
                    variant="filled"
                    margin="dense"
                    autoFocus={true}
                    fullWidth={true}
                    defaultValue={sprintName}
                    onChange={(e) => setSprintName(e.target.value)} />
            </div>
            <div className={styles.addCard}>
                <Typography variant="h4" gutterBottom>Add Another Poll</Typography>
                <Button variant="outlined" color="primary" onClick={() => setShowCreateForm(!showCreateForm)}>Add</Button>

            </div>
            <div id="createPollSection" className={styles.addpoll}>
                {
                    showCreateForm ?
                        <div id="addPollFormDiv">
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-secondary"
                                    label="Provide the ticket link here"
                                    color="primary"
                                    variant="filled"
                                    size="medium"
                                    margin="normal"
                                    autoFocus={true}
                                    fullWidth={true}
                                    defaultValue={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                // InputLabelProps={{ shrink: true }}
                                />
                                <div>
                                    <Grid container spacing={3} direction="row" justify="flex-end">
                                        <Grid item>
                                            <Button variant="outlined" color="primary" size="small" onClick={(e) => addCurrentPollToPayload(e)}>Add Poll</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </form>
                        </div>
                        : null
                }
            </div>
            <br /><br />

            {/* Display added/created poll */}
            <div id="availablePollSection" className={styles.addpoll}>
                {
                    (payloadDataList || payloadDataList.length !== 0) ?
                        <div>
                            {
                                payloadDataList.map((data, index) => {
                                    return (
                                        <div key={index}>
                                            <form>
                                                <a href={data.pollUrl} target="_blank">
                                                    <TextField
                                                        id=""
                                                        label={data.ticketNumber}
                                                        variant="outlined"
                                                        size="medium"
                                                        margin="normal"
                                                        fullWidth={true}
                                                        defaultValue={data.pollUrl}
                                                        InputProps={{ readOnly: true }}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                </a>
                                                <div>
                                                    <Grid container spacing={3} direction="row" justify="space-between">
                                                        <Grid item>
                                                            <ButtonGroup size="small" color="primary" orientation="horizontal" aria-label="small outlined button group">
                                                                {
                                                                    buttonList.map((pointValue) => {
                                                                        return (
                                                                            <Button key={pointValue} onClick={(e) => handlePollPointing(e, pointValue, data.ticketNumber)}>{pointValue}</Button>
                                                                        )
                                                                    })
                                                                }
                                                            </ButtonGroup>
                                                            <div>
                                                                <label>
                                                                    {data.pollPoint !== 0 ? `you pointed for ${data.pollPoint}` : 'Not yet pointed'}
                                                                </label>
                                                            </div>
                                                        </Grid>
                                                        <Grid item>
                                                            <label>{data.pollComment.length} replies</label>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button color="primary" size="small">
                                                                Comment
                                                        </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button color="secondary" size="small" onClick={(e) => removeCurrentPoleFromPayload(e)}>Delete</Button>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : null
                }
            </div>
            <div className={styles.createpoll}>
                <Grid container spacing={3} direction="row" alignItems="flex-end" justify="flex-end">
                    <Grid item>
                        <Button variant="outlined" color="primary" size="small" onClick={(e) => createPoll(e)}>Create Poll</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

module.exports = CreatePoll;


// poll pointing logic done.