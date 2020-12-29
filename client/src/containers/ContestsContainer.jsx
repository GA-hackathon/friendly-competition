// import { useState, useEffect } from "react";
// import { Switch, useHistory } from "react-router-dom";
// import {
//   destroyContest,
//   getAllContests,
//   postContest,
//   putContest,
//   getOneContest,
// } from "../services/contests";
// import Competitions from "../screens/main/Competitions/Competitions";
// import CompetitionCreate from "../screens/CompetitionScreens/CompetitionCreate/CompetitionCreate";
// import CompetitionEdit from "../screens/CompetitionScreens/CompetitionEdit/CompetitionEdit";
// import CompetitionDetail from "../screens/CompetitionScreens/CompetitionDetail/CompetitionDetail";

export function ContestsContainer() {
  // const [allContests, setAllContests] = useState([]);
  // const [loaded, setLoaded] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  // const history = useHistory();

  // const onDelete = (id) => {
  //   handleDelete(id);
  //   setOpenDelete(false);
  // };

  // const handleDeleteOpen = () => {
  //   setOpenDelete(true);
  // };

  // const handleDeleteClose = () => {
  //   setOpenDelete(false);
  // };
  // useEffect(() => {
  //   const fetchContests = async () => {
  //     const contestData = await getAllContests();
  //     setAllContests(contestData);
  //     setLoaded(true);
  //   };
  //   fetchContests();
  // }, []);

  // const handleCreate = async (contestData) => {
  //   const newContest = await postContest(contestData);
  //   setAllContests((prevState) => [newContest, ...prevState]);
  //   history.push("/");
  // };

  // const handleUpdate = async (id, contestData) => {
  //   const updatedContest = await putContest(id, contestData);
  //   setAllContests((prevState) =>
  //     prevState.map((contest) => {
  //       return contest.id === Number(id) ? updatedContest : contest;
  //     })
  //   );
  //   history.push("/contests");
  // };

  // const handleDelete = async (id) => {
  //   await destroyContest(id);
  //   setAllContests((prevState) =>
  //     prevState.filter((contest) => contest.id !== id)
  //   );
  //   history.push("/");
  // };

  return (
    <>
      {/* <Switch> */}
      {/* <Route path="/contests">
          <Contests
            openDelete={openDelete}
            onDelete={onDelete}
            handleDeleteClose={handleDeleteClose}
            handleDeleteOpen={handleDeleteOpen}
            loaded={loaded}
            allContests={allContests}
            handleDelete={handleDelete}
          />
        </Route> */}

      {/* <Route path="/contests/new">
          <ContestCreate handleCreate={handleCreate} />
        </Route>
        <Route path="/competitions/:id/edit">
          <ContestEdit
            allContests={allContests}
            handleUpdate={handleUpdate}
          />
        </Route>

        <Route path="/contests/:id">
          <ContestDetail
            getOneCompetition={getOneCompetition}
            handleDelete={handleDelete}
          />
        </Route> */}
      {/* </Switch> */}
    </>
  );
}
