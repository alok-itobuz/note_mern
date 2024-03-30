import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, Box, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function NoteCard({ createdAt, title, description }) {
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {title?.[0]?.toUpperCase()}
          </Avatar>
        }
        title={title}
        subheader={createdAt}
      />
      <CardMedia
        sx={{ height: 140 }}
        image="https://source.unsplash.com/random/900%C3%97700/?note"
        title="green iguana"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description?.slice(0, 130)}
          {description?.length > 131 ? "....." : ""}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
        }}
      >
        <CardActions>
          <IconButton size="small">
            <EditNoteIcon />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
}

// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditNoteIcon from "@mui/icons-material/EditNote";

// export default function NoteCard({ title, description, createdAt }) {
//   return (
//     <Card
//       sx={{
//         width: "100%",
//         height: "100%",
//         // display: "flex",
//         // flexDirection: "column",
//       }}
//     >
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             {title?.[0]?.toUpperCase()}
//           </Avatar>
//         }
//         title={title}
//         subheader={createdAt}
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image="https://source.unsplash.com/random/900%C3%97700/?note"
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           {description}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton>
//           <EditNoteIcon />
//         </IconButton>
//         <IconButton>
//           <DeleteIcon />
//         </IconButton>
//       </CardActions>
//     </Card>
//   );
// }
