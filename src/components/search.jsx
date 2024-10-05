import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  return (
    <Paper
      component="form"
      sx={{ p:'0px 2px', display: 'flex', alignItems: 'center', width: "100%", height:30, boxShadow:"none", bgcolor:"#e2e5e9", mx:1}}
    >
      <IconButton type="button" sx={{ py: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 0, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  );
}