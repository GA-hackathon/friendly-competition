import React from "react";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Card from "@material-ui/core/Card";

const Div = styled.div`
  .clear {
    cursor: pointer;
  }
  position: relative;
`;
const Dropdown = styled(Card)`
  position: absolute;
  min-width: 210px;
  top: 45px;
  background: #fff;
  box-shadow: -3px 5px 17px 1px #000;
  z-index: 4;
  .dropdown-items {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

function Search({ search, setSearch, searchedContests }) {
  let submissionsRegexp = /^\/contests/; // the pages that need to render "Search Submissions"
  let contestsRegexp = /^\/$/; // the pages that need to render "Search Contests"
  let location = useLocation();

  return (
    <Div>
      <FormControl>
        <Input
          value={search}
          placeholder={
            location.pathname.match(contestsRegexp)
              ? "Search Contests"
              : location.pathname.match(submissionsRegexp) &&
                "Search Submissions"
          }
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
      <div className="dropdown-container">
        <Dropdown>
          {/* show first 10 results matching input with slice */}
          <div className="dropdown-items">
            {search && searchedContests.slice(0, 10)}
          </div>
        </Dropdown>
      </div>
    </Div>
  );
}

export default Search;
