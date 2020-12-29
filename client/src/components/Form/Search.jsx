import React from "react";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import styled from "styled-components";

let Div = styled.div`
  .clear {
    cursor: pointer;
  }
`;
function Search({ search, setSearch }) {
  return (
    <Div>
      <FormControl>
        <Input
          value={search}
          placeholder="Search contests"
          onChange={(e) => setSearch(e.target.value)}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              {!search ? (
                <SearchIcon />
              ) : (
                <ClearIcon className="clear" onClick={() => setSearch("")} />
              )}
            </InputAdornment>
          }
        />
      </FormControl>
    </Div>
  );
}

export default Search;
