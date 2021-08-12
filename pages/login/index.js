import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Link from 'next/link'
import styles from '../../styles/Login.module.css';

const Login = () => {
    return(
        <div className={styles.main}>
            <Card className={styles.root}>
            <CardActionArea>
                <CardMedia
                className={styles.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    TNY JIRA Pointing Tool
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    The New Yorker JIRA Pointing tool
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="medium" color="primary" variant="contained">
                    <Link href="/board">
                        LOGIN
                    </Link>
                </Button>
            </CardActions>
            </Card>
        </div>
    )
};

module.exports = Login;