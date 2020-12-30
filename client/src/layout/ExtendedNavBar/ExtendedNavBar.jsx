import { useState } from "react";
import styled from "styled-components";
import QueriedContests from "../../components/ContestComponents/QueriedContests/QueriedContests";
import Search from "../../components/Form/Search";

let Div = styled.div`
  list-style-type: none;
  background: #e5e5e5;
  height: 100px;

  .search-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
    margin-right: 50px;
  }
`;

function ExtendedNavBar({ allContests, allSubmissions }) {
  const [search, setSearch] = useState("");

  const getContests = () =>
    allContests.filter((contest) =>
      contest.name.toLowerCase().includes(`${search}`.toLowerCase())
    );

  const searchedContests = getContests().map((contest) => (
    <QueriedContests contest={contest} key={contest.id} />
  ));

  return (
    <Div>
      <div className="search-container">
        <Search
          search={search}
          setSearch={setSearch}
          searchedContests={searchedContests}
        />
      </div>
    </Div>
  );
}

export default ExtendedNavBar;
