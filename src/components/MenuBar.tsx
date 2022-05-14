import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position:fixed;
  top:0;
  left:0;
  z-index:999;

  color:white;
  padding:0;
  width:100%;

  >.container {
    display:flex;
    flex-direction:rows;
    align-items:center;
    padding:30px 40px;

    >.title {
      font-size:24px;
    }

    >.menus {
      flex:1;

      display:flex;
      flex-direction:rows;
      justify-content:flex-end;
      align-items:center;

      >a {
        margin-right:30px;

        &:last-child {
          margin-right:0;
        }

        >.menu {
          color:white;
          cursor:pointer;

          &:hover {
            color:#333;
          }
        }
      }
    }
  }
`

const MenuBar = () => {
  
  const isMobileVal = useMediaQuery({
    query: "(max-width:767px) "
  });
  
  return (<Wrapper className={isMobileVal ? "m" : ""}>
    <div className="container">
      <div className="title">davin.world</div>
      <div className="menus">
        <Link to="/magazine"><div className="menu">Magazine</div></Link>
        <Link to="/brand"><div className="menu">Brand</div></Link>
        <Link to="/film"><div className="menu">Film</div></Link>
      </div>
    </div>
  </Wrapper>)
};

export default MenuBar;