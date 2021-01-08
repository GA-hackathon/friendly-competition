import styled from 'styled-components'

let Nav = styled.nav`

list-style-type: none;
background: white;
margin: 0;
padding: 0;
display: flex;
justify-content: space-between;


li.nav-block {
  min-width: 12rem;
  min-height: 6rem;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}

li.nav-block.home{
  border: 3px solid ${(props) => props.location.pathname.match(/^\/$/) ?  "#007467" : "rgba(0, 0, 0, 0)" };
  border-radius: 5%;
}

li.nav-block.create{
  border: 3px solid ${(props) => props.location.pathname.match(/^\/create-contest/)  ? "#007467" : "rgba(0, 0, 0, 0)" };
  border-radius: 5%;
}

li.nav-block.about {
  border: 3px solid ${(props) => props.location.pathname.match(/^\/about/) ? "#007467" : "rgba(0, 0, 0, 0)" };
  border-radius: 5%;
}

ul.links{
  display: flex;
  width: 80%;
  justify-content: space-around;
  padding: 0;
}

li a {
  text-decoration: none;
  text-align: center;
  color: black;
  font-weight: 500;
}

.navbar-img {
  list-style-type: none;
  display: inline;
  float: right;
  padding: 0;
  margin: 0.5rem 1rem 0 0;
}

// li.img {
//   background: #eee7e7;
//   border-radius: 50%;
//   width: 4rem;
//   height: 4rem;
// }

li.text {
  text-align: center;
}

.logo img {
  filter: invert(25%) sepia(31%) saturate(4621%) hue-rotate(154deg) brightness(96%) contrast(101%);
}

.user-info{
  text-align: center;
  margin-right: 1rem;
}

.user-info .name{
  font-size: 0.8rem;
}

.user-info .account-circle-icon{
  width: 4rem;
  height: 4rem;
}

.user-image {
  width: 50px;
  height: 50px;
  max-width: 50px;
  max-height: 50px;
  border: 1px solid black;
  border-radius: 50%;
  object-fit: cover;
}
.user-column {
  margin: 1rem;
  border-left: 3px solid;
  display: flex;
  width: 20%;
  justify-content: space-evenly;
  align-items: center;
}

.MuiSvgIcon-root.icon {
  font-size: 50px;
}

.profile-link {
  text-decoration: none;
  color: black;
}

.logo{
  padding: .5rem;
}

.auth-buttons a{
  margin-right: 1rem;
  background: white;
  border: 1px solid black;
  cursor: pointer;
}

.sign-out-btn,
.sign-out-btn:hover,
.sign-out-btn:active {
  border: none;
  background: transparent;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
}

.sign-out-btn:focus {
  outline: 0;
}
`

export default Nav




