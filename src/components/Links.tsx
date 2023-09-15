import _  from 'underscore';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { LinkModel } from "../Models";
interface LinkProps {
    linkList: LinkModel[];
}

export const Links: React.FunctionComponent<LinkProps> = (props:LinkProps) => {
    return <div className="card-container">
        {_.map(props.linkList, (link) => {
            return <LinkCard title={link.title} url={link.url}/>;
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

    return <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={formattedUrl()} target="_blank" >Open</Button>
      </CardActions>
    </Card>;
}