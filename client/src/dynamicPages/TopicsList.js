import React, { useEffect } from "react";
import TopicContainer from "../components/TopicContainer";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import Modal from "../components/TopicEditDialog";
const useStyles = makeStyles((theme) => ({
  AddButton: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function TopicsList() {
  const [topicsList, setTopicsList] = React.useState([]);
  const [modalState, setModalState] = React.useState(false);
  const [topicInEdit, setTopicInEdit] = React.useState({});
  useEffect(() => {
    if (!modalState) {
      axios({
        url: "http://localhost:5000/graphiql",
        method: "post",
        data: {
          query: `
              query{
                topics{
                  title
                  description
                  _id
                }
              }
                `,
        },
      })
        .then((result) => {
          setTopicsList(result.data.data.topics);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [modalState]);
  const addTopic = () => {
    let query = `
        mutation{
            createTopic(topicInput:{title:"Topic ${topicsList.length +
              1}",description:"Unknown"}){
              title
              description
            }
          }
          `;
    axios({
      url: "http://localhost:5000/graphiql",
      method: "post",
      data: {
        query: query,
      },
    })
      .then((result) => {
        setTopicsList([...topicsList, result.data.data.createTopic]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const openEdit = (topic) => {
    setTopicInEdit(topic);
    setModalState(true);
  };
  const closeEdit = () => {
    setTopicInEdit({});
    setModalState(false);
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      {topicsList.map((topic) => {
        return (
          <TopicContainer topic={topic} openEdit={openEdit} key={topic._id} />
        );
      })}

      <div className={classes.AddButton}>
        <Fab
          style={{ margin: 10 }}
          aria-label="Add"
          color="primary"
          size="small"
          onClick={addTopic}
        >
          <AddIcon fontSize={"large"} style={{ color: "white" }} />
        </Fab>
      </div>
      <Modal openState={modalState} close={closeEdit} topic={topicInEdit} />
    </React.Fragment>
  );
}
