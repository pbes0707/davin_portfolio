import {useCallback, useEffect, useState} from "react";
import {
    Link, 
    useLocation, 
    useParams,
    useNavigate
} from "react-router-dom";
import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import {MOBILE_QUERY} from "../CommonUtils";

import {Section, Wrapper} from "../components/Common/Section";
import Footer from "../components/Footer";
import MenuBar from "../components/MenuBar";
import { useSnackbar } from "notistack";
import { IMAGE_DETAIL_LIST, IMAGE_LIST } from "./dataList";

const TitleContainer = styled.div<{image:string}>`

    height:400px;
    width:100%;
    background: url("${p => p.image}");
    background-size:cover;
    background-position:center;
`

const MainPlace = styled.div<{isMobile:boolean}>`
    display:flex;
    flex-direction:column;
    align-items:center;

    min-height:100vh;

    >.container {
        width:100%;
        max-width:1200px;
        text-align:left;
        margin-bottom:200px;

        padding:${p => p.isMobile ? "0 5px" : "0"};

        >.title {
            margin-top:${p => p.isMobile ? "20px" : "60px"};
            font-size:40px;
            font-weight:bold;
        }

        >.project-title {
            margin-top:${p => p.isMobile ? "20px" : "60px"};
            font-size:${p => p.isMobile ? "24px" : "40px"};
            font-weight:bold;
        }

        >.desc {
            margin-top:${p => p.isMobile ? "10px" : "20px"};
        }

        >.back {
            margin-top:40px;
            cursor:pointer;
            color:black;

            &:hover {
                color: #333;
            }
        }
    }
`

const ImgList = styled.div<{isMobile:boolean}>`
    display:flex;
    flex-direction:column;
    margin-top:${p => p.isMobile ? "60px" : "100px"};
`

const ImgColumn = styled.div<{isMobile:boolean}>`
    display:flex;
    flex-direction:row;
    padding:${p => p.isMobile ? "5px 0" : "10px 0"};
`

const ImgRow = styled.div<{horizontal:any, image:string, isMobile:boolean}>`
    display:flex;
    flex:${p => p.horizontal};
    background: url("${p => p.image}");
    background-size:cover;
    background-position:center;

    height:${p => p.isMobile ? "200px" : "400px"};
    margin:${p => p.isMobile ? "0 5px" : "0 10px"};
    cursor:pointer;

    >div {
        position:relative;
        width:100%;
        color:white;

        display:none;
        justify-content:center;
        align-items:center;

        >.dim {
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            opacity:0;
            background:black;
        }

        >.title {
            position:relative;
            z-index:2;
            font-size:20px;
            padding:0 10px;
            text-align:center;
        }
    }


    &:hover {
        >div {
            display:flex;
            >.dim {
                opacity:0.5;
                transition: opacity 0.5s;
            }
        }
    }
`

const SelectImage = styled.div`
    position:fixed;
    z-index:1001;
    top:0;
    left:0;
    width:100vw;
    height:100vh;

    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;

    >.dim {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:black;
        opacity:0.5;
    }

    >img {
        position:relative;
        max-width:95%;
        max-height:95%;
    }
`

const VideoContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`

const VideoList = styled.div<{isMobile:boolean}>`
    display:flex;
    flex-direction:column;

    margin-top:${p => p.isMobile ? "60px" : "100px"};
    width:100%;
    max-width:1000px;
`

const VideoRow = styled.div<{isMobile:boolean}>`
    margin-bottom:${p => p.isMobile ? "60px" : "100px"};

    >.subject {
        margin-bottom:10px;
        font-size:24px;
        font-weight:bold;
        padding-bottom:10px;
        border-bottom:1px solid black;
    }
    
    >.vimeo {
        position: relative;
        padding-bottom: 56.25%; /* 16/9 ratio */
        padding-top: 30px; /* IE6 workaround*/
        height: 0;
        overflow: hidden;
        margin: 0;

        iframe, object, embed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
`


const findProject = (pageType:number, projectId:number) => {
    for (let v of IMAGE_LIST[pageType]) {
        let data = v.find( (e:any) => e[0] == projectId);
        if(!!data) return data;
    }
    return null;
}

const ProjectList = (props: any) => {

    const isMobileVal = useMediaQuery({
        query: MOBILE_QUERY
    });

    const location = useLocation();
    const navigate = useNavigate();
    const { id: projectId } = useParams();
    const {enqueueSnackbar} = useSnackbar();

    const [selectImage, setSelectImage] = useState<string|null>(null);
    const [projectData, setProjectData] = useState<any>(null);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [pageType, setPageType] = useState<number>(0);


    const handleProject = (projectId:any) => {
        switch(pageType) {
            case 0:
                return navigate(`/magazine/${projectId}`, {});
            case 1:
                return navigate(`/brand/${projectId}`, {});
            case 2:
                return navigate(`/film/${projectId}`, {});
        }
    }

    const handleSelectImage = (src:string|null) => {
        setSelectImage(src);
    }
    
    useEffect(() => {

        if (location.pathname.startsWith("/film")) {
            setPageType(2);
        } else if (location.pathname.startsWith("/brand")) {
            setPageType(1);
        } else {
            setPageType(0);
        }

        if (!!projectId) {
            let d = findProject(pageType, Number(projectId))
            setProjectData(d);
            if (d != null) {
                setTitle(String(d[2]));
            } else {
                enqueueSnackbar("데이터를 찾을 수 없습니다.", { variant:'error' });
                navigate('/')
            }
            setDesc("")
        } else {
            switch(pageType) {
                case 0:
                    setTitle("MAGAZINE");
                    setDesc("Food And Beverage Magazine Work")
                    break;
                case 1:
                    setTitle("BRAND")
                    setDesc("Food And Beverage Brand Work")
                    break;
                case 2:
                    setTitle("FILM")
                    setDesc("Food And Beverage Film Work")
                    break;
            }
        }
    })
    
    return (<Wrapper>
        <MenuBar theme={"white"}/>

        <TitleContainer image={(!!projectData && !!projectId) ? `/img${location.pathname}/${projectData[1]}` : THUMBNAIL_LIST[pageType]}></TitleContainer>

        <MainPlace isMobile={isMobileVal}>
            { (!!projectData && !!projectId) ? 
                <div className="container">
                    <div className="back" onClick={() => navigate(-1)}>&lt; 뒤로가기</div>
                    <div className="project-title">{title}</div>
                    <ImgList isMobile={isMobileVal}>
                        {IMAGE_DETAIL_LIST[pageType][projectId].map( (v:any, k:any) => {
                            return <ImgColumn isMobile={isMobileVal} key={k}>
                                {v.map( (e:any, kk:any) => {
                                    return <ImgRow 
                                        className="wow fadeInUp"
                                        data-wow-delay={`${0.1 * kk}s`}
                                        isMobile={isMobileVal}
                                        key={kk}
                                        horizontal={e[1]}
                                        image={`/img${location.pathname}/${e[0]}`}
                                        onClick={() => handleSelectImage(`/img${location.pathname}/${e[0]}`)}
                                    ></ImgRow>
                                })}
                            </ImgColumn>
                    })}
                    </ImgList>
                </div> : 
                <div className="container">
                    <div className="title">{title}</div>
                    <div className="desc">{desc}</div>
                    {pageType != 2 ? <ImgList isMobile={isMobileVal}>
                        {IMAGE_LIST[pageType].map( (e:any, k:any) => {
                            return <ImgColumn isMobile={isMobileVal} key={k}>
                                {e.map( (v:any, kk:any) => {
                                    return <ImgRow
                                        className="wow fadeInUp"
                                        data-wow-delay={`${0.1 * kk}s`}
                                        isMobile={isMobileVal}
                                        key={v[0]}
                                        horizontal={v[3]} 
                                        onClick={() => handleProject(v[0])}
                                        image={`/img${location.pathname}/${v[0]}/${v[1]}`}>
                                        <div>
                                            <div className="dim"></div>
                                            <div className="title">{v[2]}</div>
                                        </div>
                                    </ImgRow>
                                })}
                            </ImgColumn>
                        })}
                    </ImgList> :
                    <VideoContainer>
                        <VideoList isMobile={isMobileVal}>
                            {IMAGE_LIST[pageType].map( (e:any, k:any) => {
                                let v = e[0];
                                return <VideoRow isMobile={isMobileVal}>
                                    <div className="subject">{v[2]}</div>
                                    <div className="vimeo">
                                        <iframe src={`https://player.vimeo.com/video/${v[1]}`} 
                                            frameBorder="0" 
                                            allow="autoplay; fullscreen; picture-in-picture" allowFullScreen={false}></iframe>
                                    </div>
                                </VideoRow>
                            })}
                        </VideoList>
                    </VideoContainer>
                    }
                </div>}
        </MainPlace>
        
        {selectImage != null ?
            <SelectImage onClick={() => setSelectImage(null)}>
                <div className="dim"/>
                <img src={selectImage}/>
            </SelectImage> : null
        }
        
        <Footer/>
    </Wrapper>)
}

const THUMBNAIL_LIST = [
    "/img/main/magazine.jpg",
    "/img/main/brand.jpg",
    "/img/main/magazine.jpg",
]


export default ProjectList;