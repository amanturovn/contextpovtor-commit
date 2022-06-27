import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { productsContext } from "../../contexts/productsContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ item }) {
  const { deleteProduct } = React.useContext(productsContext);
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345, margin: "10px" }}>
      <CardMedia
        component="img"
        height="140"
        image={item.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => deleteProduct(item.id)} size="small">
          Delete
        </Button>
        <Button size="small">Edit</Button>
        <Button onClick={() => navigate(`/details/${item.id}`)} size="small">
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
