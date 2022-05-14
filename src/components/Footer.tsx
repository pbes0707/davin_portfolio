import styled from "styled-components";
import {useMediaQuery} from "react-responsive";

const Wrapper = styled.div`

  text-align: center;

  .footer {
    background: black;
    width: 100%;
    padding: 60px 0;
    color: white;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    > .left {

      > .copyright {
        margin-top: 18px;
      }

      > .title {

      }
    }

    > .right {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;

      font-size: 16px;
      margin-left: 40px;

      > .p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > img {
          margin-bottom: 15px;
        }
      }

      > .c {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin-left: 40px;
      }
    }
  }

`;


const Footer = () => {

    const isMobileVal = useMediaQuery({
        query: "(max-width:767px) "
    });

    return (
        <Wrapper className={isMobileVal ? "m" : ""}>
            <div className="footer">
                <div className="left">
                    <div className="copyright">ⓒ2018-2023 Davin Park | All Right Reserved.</div>
                </div>
            </div>
        </Wrapper>
    )
};

export default Footer;
