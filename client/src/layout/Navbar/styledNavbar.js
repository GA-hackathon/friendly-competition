import styled from 'styled-components'

let Nav = styled.nav`

  list-style-type: none;
  background: #c4c4c4;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: space-between;


li.nav-block {
  background: #edd2d2;
  width: 10rem;
  height: 4rem;
  margin: 1rem 0 1.5rem 0.7rem;
  display: inline;
  float: left;
  padding-left: 1rem;
}

li a {
  text-decoration: none;
  padding-top: 1rem;
  display: block;
}

.navbar-img {
  list-style-type: none;
  display: inline;
  float: right;
  padding: 0;
  margin: 0.5rem 1rem 0 0;
}

li.img {
  background: #eee7e7;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
}

li.text {
  text-align: center;
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
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-right: 50px;
  padding: 20px;
}
.MuiSvgIcon-root.icon {
  font-size: 50px;
}

.logo {
  width: 50px;
}
.profile-link {
  text-decoration: none;
  color: black;
}
`

export default Nav