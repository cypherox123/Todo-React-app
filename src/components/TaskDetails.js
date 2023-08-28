import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Divider, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardContainer = styled(Card)({
  maxWidth: 400,
  margin: "0 auto",
  marginTop: (theme) => theme.spacing(4),
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
});

const Title = styled(Typography)({
  marginBottom: (theme) => theme.spacing(2),
});

const Description = styled(Typography)({
  marginBottom: (theme) => theme.spacing(1),
});

const BoldTitle = styled(Typography)({
  fontWeight: "bold",
});

const TaskDetails = () => {
  const { id } = useParams();
  const task = useSelector((state) => state.tasks[id]);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <CardContent>
      <Paper elevation={3} style={{ padding: "8px", marginBottom: "16px" }}>
        <BoldTitle variant="h5" component="h2">
          {task.title}
        </BoldTitle>
      </Paper>
      <Divider style={{ marginBottom: "8px" }} />
     <Paper elevation={3} style={{ padding: "8px", marginBottom: "16px" }}>
     <Description variant="body2" color="textSecondary">
        <strong>Description:</strong> {task.description}
      </Description>
      <Description variant="body2" color="textSecondary">
        <strong>Status:</strong> {task.status}
      </Description>
      <Description variant="body2" color="textSecondary">
        <strong>Due Date:</strong> {task.dueDate}
      </Description>
     </Paper>
    </CardContent>
  );
};

export default TaskDetails;
