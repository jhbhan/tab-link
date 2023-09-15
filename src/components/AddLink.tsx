import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React from 'react';
import {LinkModel} from '../Models';

interface AddLinkProps {
    isOpen: boolean;
    handleClose: () => void;
    handleAdd: (model: LinkModel) => void;
}
export const AddLink:React.FunctionComponent<AddLinkProps> = (props:AddLinkProps) => {
    const [title, setTitle] = React.useState<string>('');
    const [url, setUrl] = React.useState<string>('');

    return <Dialog open={props.isOpen}>
    <DialogTitle>Add New Link</DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        label="Link Name"
        fullWidth
        variant="standard"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        margin="dense"
        label="URL"
        fullWidth
        variant="standard"
        onChange={(e) => setUrl(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose}>Cancel</Button>
      <Button onClick={() => props.handleAdd({title: title, url: url})}>Add</Button>
    </DialogActions>
  </Dialog>;
}