import {GridToolbarDensitySelector, GridToolbarFilterButton} from '@mui/x-data-grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

export const QuickSearchToolbar = (props: QuickSearchToolbarProps) => {
  return (
    <div>
      <div>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small"/>,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{visibility: props.value ? 'visible' : 'hidden'}}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small"/>
            </IconButton>
          ),
        }}
      />
    </div>
  );
}
