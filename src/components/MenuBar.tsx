import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import { Link } from "react-router-dom";

const Wrapper = styled.div<{theme:string}>`
  position:fixed;
  top:0;
  left:0;
  z-index:999;

  color:white;
  padding:0;
  width:100%;

  >.dim {
    position:absolute;
    background:black;
    opacity:0.5;
    width:100%;
    height:100%;
  }

  >.container {
    position:relative;
    display:flex;
    flex-direction:rows;
    align-items:center;
    padding:30px 40px;

    .title {
      font-size: 24px;
      font-weight:600;
      color: ${p => p.theme == "black" ? "black" : "white"};
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
          color: ${p => p.theme == "black" ? "black" : "white"};
          cursor:pointer;
          font-weight:500;
          font-size:20px;

          &:hover {
            color: ${p => p.theme == "black" ? "white" : "black"};
          }
        }
      }
    }
  }
`

const MenuBar = (props:any) => {
  
  const isMobileVal = useMediaQuery({
    query: "(max-width:767px) "
  });
  
  return (<Wrapper theme={props.theme} className={isMobileVal ? "m" : ""}>
    <div className="dim"></div>
    <div className="container">
      <Link to="/"><div className="title">davin's gallery</div></Link>
      <div className="menus">
        <Link to="/magazine"><div className="menu">Magazine</div></Link>
        <Link to="/brand"><div className="menu">Brand</div></Link>
        <Link to="/film"><div className="menu">Film</div></Link>
      </div>
    </div>
  </Wrapper>)
};

export default MenuBar;