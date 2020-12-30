export const checkContests = (user) => {
  if (user?.contests?.length === 0) {
    return <h1>{user?.name}&nbsp;has no contests</h1>;
  } else if (user?.contests.length === 1) {
    return <h1>{user?.contests?.length}&nbsp;Contest:</h1>;
  }
  return <h1>{user?.contests?.length}&nbsp;Contests:</h1>;
};

export const checkSubmissions = (user) => {
  if (user?.length === 0) {
    return <h1>{user?.name}&nbsp;has no entries</h1>;
  } else if (user?.submissions.length === 1) {
    return <h1>{user?.submissions?.length}&nbsp;Entry:</h1>;
  }
  return <h1>{user?.submissions?.length}&nbsp;Entries:</h1>;
};
