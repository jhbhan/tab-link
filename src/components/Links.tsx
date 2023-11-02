import _  from 'underscore';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LinkModel } from "../models/Models";
import { AddLink } from './AddLink';
import { deleteLink } from '../services/firebaseReadWriteService';
import { AppContext } from '../pages/appContext';

interface LinkProps {
    linkList: LinkModel[];
    handleChange: () => void;
}

export const Links: React.FunctionComponent<LinkProps> = (props:LinkProps) => {
  const [open, setOpen] = useState(false);
    return <>
    <div className="card-container">
        {_.map(props.linkList, (link) => {
            return <LinkCard handleChange={props.handleChange} link={link}/>;
        })}
    </div>
    <AddLink isOpen={open} handleClose={() => {setOpen(false);}} handleAdd={()=>{return;}} />
</>;
}

interface LinkCardProps {
  link: LinkModel,
  handleChange: () => void
}

const LinkCard: React.FunctionComponent<LinkCardProps> = (props: LinkCardProps) => {
    const appContext = useContext(AppContext);

    const formattedUrl = (url: string) => {
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            return 'https://' + url;
          }
        return url;
    };

    const openLink = () => {
      _.forEach(props.link.urls, (url: string) => {
        chrome.tabs.create({
            url: formattedUrl(url)
        });
      });
    };

    const handleDelete = (linkId: string) => {
      deleteLink(linkId,appContext.userId);
      props.handleChange();
    }

    return <Card className ="link-card" sx={{ maxWidth: 345, margin: "12px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.link.title}
        </Typography>
      </CardContent>
      <CardActions className="link-card-action-buttons">
        <Button onClick={() => openLink()}>Open</Button>
        <Button>Edit</Button>
        <Button onClick={() => {handleDelete(props.link.id!)}}>Delete</Button>
      </CardActions>
    </Card>;
}