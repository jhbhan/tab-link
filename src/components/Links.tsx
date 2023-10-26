import _  from 'underscore';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LinkModel } from "../models/Models";
import { AddLink } from './AddLink';

interface LinkProps {
    linkList: LinkModel[];
}

export const Links: React.FunctionComponent<LinkProps> = (props:LinkProps) => {
  const [open, setOpen] = useState(false);
    return <>
    <div className="card-container">
        {_.map(props.linkList, (link) => {
            return <LinkCard {...link}/>;
        })}
    </div>
    <AddLink isOpen={open} handleClose={() => {setOpen(false);}} handleAdd={()=>{return;}} />
</>;
}

const LinkCard: React.FunctionComponent<LinkModel> = (props: LinkModel) => {
    const formattedUrl = () => {
        if (!props.url.startsWith('https://') && !props.url.startsWith('http://')) {
            return 'https://' + props.url;
          }
          return props.url;
    }

    return <Card className ="link-card" sx={{ maxWidth: 345, margin: "12px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions className="link-card-action-buttons">
        <Button href={formattedUrl()} target="_blank" >Open</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </CardActions>
    </Card>;
}