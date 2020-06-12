import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
    TopicContainer: {
      minWidth:"80%",
      [theme.breakpoints.down('xs')]: {
        marginTop:theme.spacing(5),
      }
    },
    actionArea:{
      padding:theme.spacing(0),
      paddingLeft:theme.spacing(3),
      paddingRight:theme.spacing(3),
    }
  }));

export default function TopicContainer({topic, openEdit}) {
   
    const classes = useStyles();
    return (
      <div className={classes.actionArea}>
        <Paper onClick={()=>{openEdit(topic)}}>
          <Card width={1} className={classes.TopicContainer}>
            <CardActionArea>
              <CardContent>
                  <Typography gutterBottom variant="h4" component="h4">{topic.title}</Typography>
                  <Typography variant="body1" component="p">{topic.description}</Typography>

                  {/*<Typography variant="body1" component="p">Finished: 0</Typography>
                  <Typography variant="body1" component="p">Failed: 0</Typography>*/}
                </CardContent>
            </CardActionArea>
          </Card>

        </Paper>
        <Divider/>
      </div>



    )
}
