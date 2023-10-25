import _  from 'underscore';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LinkModel } from "../models/Models";

interface LinkProps {
    linkList: LinkModel[];
}

export const Links: React.FunctionComponent<LinkProps> = (props:LinkProps) => {
    return <div className="card-container">
        {_.map(props.linkList, (link) => {
            return <LinkCard {...link}/>;
        })}
    </div>;
}

const LinkCard: React.FunctionComponent<LinkModel> = (props: LinkModel) => {
    const formattedUrl = () => {
        if (!props.url.startsWith('https://') && !props.url.startsWith('http://')) {
            return 'https://' + props.url;
          }
          return props.url;
    }

    return <Card sx={{ maxWidth: 345, margin: "12px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={formattedUrl()} target="_blank" >Open</Button>
        <Button>Edit</Button>
      </CardActions>
    </Card>;
}