import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    TopicContainer: {
      margin:theme.spacing(1),
    },
  }));

export default function TopicContainer({topic:{TopicName,dailyTasks,tasksDone,type}}) {
   
    const classes = useStyles();
    return (
        <Card maxWidth="xl" class={classes.TopicContainer}>
          <CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">{TopicName}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{dailyTasks}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{tasksDone}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{type}</Typography>
              </CardContent>
          </CardActionArea>

        </Card>
    )
}
