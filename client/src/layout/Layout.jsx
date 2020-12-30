import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import ExtendedNavBar from "./ExtendedNavBar/ExtendedNavBar";
import { getAllContests } from "../services/contests";
import { getAllSubmissions } from "../services/submissions";

function Layout({ children }) {
  const [allContests, setAllContests] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      const contestData = await getAllContests();
      setAllContests(contestData);
    };
    fetchContests();
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const submissionData = await getAllSubmissions();
      setAllSubmissions(submissionData);
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="layout">
      <Navbar />
      <ExtendedNavBar
        allContests={allContests}
        allSubmissions={allSubmissions}
        className="extended-navbar"
      />
      <div className="layout-children">{children}</div>
      <footer></footer>
    </div>
  );
}

export default Layout;
