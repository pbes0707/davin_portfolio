import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import { Link } from "react-router-dom";
import {MOBILE_QUERY} from "../CommonUtils";

const Wrapper = styled.div<{theme:string, isMobile:boolean}>`
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
    flex-direction:${p => p.isMobile ? "column" : "rows"};
    align-items:center;
    ${p => p.isMobile ? "padding:20px 10px;" : "padding:30px 40px;"};

    .title {
      font-size: 24px;
      font-weight:600;
      color: ${p => p.theme == "black" ? "black" : "white"};
    }

    >.menus {
      flex:1;

      display:flex;
      flex-direction:rows;
      justify-content:${p => p.isMobile ? "center" : "flex-end"};;
      align-items:center;

      ${p => p.isMobile ? "margin-top:10px;" : ""};

      >a {
        margin-right:30px;

        &:last-child {
          margin-right:0;
        }

        >.menu {
          color: ${p => p.theme == "black" ? "black" : "white"};
          cursor:pointer;
          font-weight:500;
          font-size:${p => p.isMobile ? "16px" : "20px"};

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
    query: MOBILE_QUERY
  });
  
  return (<Wrapper theme={props.theme} isMobile={isMobileVal}>
    <div className="dim"></div>
    <div className="container">
      <Link to="/"><div className="title">@davinworld</div></Link>
      <div className="menus">
        <Link to="/magazine"><div className="menu">Magazine</div></Link>
        <Link to="/brand"><div className="menu">Brand</div></Link>
        <Link to="/film"><div className="menu">Film</div></Link>
      </div>
    </div>
  </Wrapper>)
};

export default MenuBar;