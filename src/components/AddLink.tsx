import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React from 'react';
import { FormControl, Input, Chip } from '@mui/material';

interface AddLinkProps {
  isOpen: boolean;
  handleClose: () => void;
  handleAdd: (urls: string[], title: string) => void;
}
export const AddLink: React.FunctionComponent<AddLinkProps> = (props: AddLinkProps) => {
  const [title, setTitle] = React.useState<string>('');
  const [values, setValues] = React.useState<string[]>([]);
  const [currValue, setCurrValue] = React.useState<string>('');

  const handleChange = (e: any) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item: string, index: number) => {
    let arr = [...values]
    arr.splice(index, 1)
    setValues(arr)
  }

  const handleAdd = () => {
    props.handleAdd(values, title);
    setValues([]);
    setCurrValue("");
  }

  return <Dialog open={props.isOpen} sx={{'.MuiPaper-root': {width: '400px'}}}>
    <DialogTitle>Add New Link</DialogTitle>
    <DialogContent>
      <TextField
        margin='dense'
        label='Link Name'
        fullWidth
        variant='standard'
        onChange={(e) => setTitle(e.target.value)}
      />
      <FormControl
        sx={{
          '&.MuiFormControl-root': {
            width: '100%'
          }
        }}>
        <div className='url-chip-container'>
          {values.map((item, index) => (
            <Chip className='url-chip' size='small' onDelete={() => handleDelete(item, index)} label={item} />
          ))}
        </div>
        <Input
          value={currValue}
          onChange={handleChange}
        />
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose}>Cancel</Button>
      <Button onClick={() => {handleAdd()}}>Add</Button>
    </DialogActions>
  </Dialog>;
}