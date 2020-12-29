import { Link } from "react-router-dom";
import { useStateValue } from "../../../providers/CurrentUserProvider";
import { useState } from "react";
import Search from "../../../components/Form/Search";
import Wrapper from "./styledHome";
import Layout from "../../../layout/Layout";

function Home() {
  const [{ currentUser }] = useStateValue();
  const [search, setSearch] = useState("");

  return (
    <Layout>
      <Wrapper>
        <div className="row-1">
          {currentUser && <>Welcome {currentUser?.first_name}</>}&nbsp;
          <Search search={search} setSearch={setSearch} />
        </div>
      </Wrapper>
    </Layout>
  );
}

export default Home;
