import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import {MOBILE_QUERY} from "../CommonUtils";

import {Section, Wrapper} from "../components/Common/Section";
import Footer from "../components/Footer";
import MenuBar from "../components/MenuBar";


const BackgroundComp = styled.div<{ src: string }>`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;

  background-image: url('${p => p.src}');
  background-position: center;
  background-size: cover;
`

const BackgroundVideo = styled.div`
  position:absolute;
  top:0;
  left:0;
  width: 100%;

  >video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
}`

const Dim = styled.div`
  position:absolute;
  top:0;
  left:0;
  background:black;
  opacity:0.5;
  width:100%;
  height:100%;
`

const Container = styled.div<{verticalAlign?:string}>`
  position:relative;
  height:100%;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:${p => p.verticalAlign ?? "center"};
`

const MainTitle = styled.div`
  font-size: 32px;
  color:white;
`

const Contact = styled.div`
  margin:100px 0;
  padding:0 40px;

  >.title {
    font-size:42px;
    font-weight: bold;
    margin-bottom:40px;
  }

  >.desc {
    font-size:18px;

    >a {
      color:black;

      &:hover {
        text-decoration:underline;
      }
    }
  }
`

const GoToProject = styled.div`
  font-size:28px;
  border:1px solid #333;
  padding: 20px 80px;
  color:#333;
  cursor:pointer;

  &:hover {
    color:white;
    background:#333;
  }
`

const GoToProjectWhite = styled(GoToProject)`
  border:1px solid white;
  color:white;

  &:hover {
    color:#333;
    background:white;
  }
`

const HomePage = (props: any) => {

    const isMobileVal = useMediaQuery({
        query: MOBILE_QUERY
    });

    return (<Wrapper>
      <MenuBar theme={"white"}/>
      <Section isMobile={isMobileVal} isFull={true}>
          <BackgroundVideo>
            <Dim />
            <video autoPlay muted loop playsInline>
              <source src={isMobileVal ? "/img/main/main_mobile.mp4" : "/img/main/main.mp4"} type="video/mp4"/>
            </video>
          </BackgroundVideo>
          <Container verticalAlign="center">
            <MainTitle>Welcome to davin's World!</MainTitle>
          </Container>
      </Section>
      <Section isMobile={isMobileVal} isFull={true}>
          <BackgroundComp src="/img/main/magazine.jpg" />
          <Container>
            <Link to="/magazine">
              <GoToProject>
                Magazine
              </GoToProject>
            </Link>
          </Container>
      </Section>
      <Section isMobile={isMobileVal} isFull={true}>
          <BackgroundComp src="/img/main/brand.jpg" />
          <Container>
            <Link to="/brand">
              <GoToProjectWhite>
                Brand
              </GoToProjectWhite>
            </Link>
          </Container>
      </Section>
      <Section isMobile={isMobileVal} isFull={true}>
          <BackgroundVideo>
            <Dim />
            <video autoPlay muted loop playsInline>
              <source src="/img/main/film.mp4" type="video/mp4"/>
            </video>
          </BackgroundVideo>
          <Container>
            <Link to="/film">
              <GoToProjectWhite>
                Film
              </GoToProjectWhite>
            </Link>
          </Container>
      </Section>
      <Section isMobile={isMobileVal} isFull={false}>
        <Contact>
          <div className="title">Contact</div>
          <div className="desc">
            최고의 포토그래퍼 다빈이에게 컨택해주세요.<br/>
            <br/>
            <a href="mailto:photographer.davin@gmail.com">photographer.davin@gmail.com</a>
          </div>
        </Contact>
      </Section>

      <Footer/>
    </Wrapper>)
}

export default HomePage;
