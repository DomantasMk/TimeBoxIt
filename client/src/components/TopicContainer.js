import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    TopicContainer: {
      minWidth:"80%",
      [theme.breakpoints.down('xs')]: {
        marginTop:theme.spacing(5),
      }
    },
    actionArea:{
      padding:theme.spacing(1),
      paddingLeft:theme.spacing(3),
      paddingRight:theme.spacing(3),
    }
  }));

export default function TopicContainer({topic:{TopicName,dailyTasks,tasksDone,type}}) {
   
    const classes = useStyles();
    return (
      <div class={classes.actionArea}>
        <Paper>
          <Card width={1} class={classes.TopicContainer}>
            <CardActionArea>
              <CardContent>
                  <Typography gutterBottom variant="h4" component="h4">{TopicName}</Typography>
                  <Typography variant="body1" component="p">{dailyTasks}</Typography>
                  <Typography variant="body1" component="p">{tasksDone}</Typography>
                  <Typography variant="body1" component="p">{type}</Typography>
                </CardContent>
            </CardActionArea>
          </Card>
        </Paper>
      </div>



    )
}
