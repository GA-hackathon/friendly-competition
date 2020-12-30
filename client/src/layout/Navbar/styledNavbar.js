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
  background:#36B7FF;
  width: 12rem;
  height: 6rem;
  margin: 0.5rem 0 1rem 1rem;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul.links{
  padding: 0;
}

li a {
  text-decoration: none;
  display: block;
  text-align: center;
  color: black;
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
  display: flex;
  align-items: center;
  margin-right: 1rem;
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
`

export default Nav




