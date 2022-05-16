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

const findProject = (pageType:number, projectId:number) => {
    for (let v of IMAGE_LIST[pageType]) {
        let data = v.find(ee => ee[0] == projectId);
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

    let pageType = 0;
    if (location.pathname.startsWith("/film")) {
        pageType = 2;
    } else if (location.pathname.startsWith("/brand")) {
        pageType = 1;
    } else {
        pageType = 0;
    }


    const handleProject = useCallback((projectId:any) => {
        switch(pageType) {
            case 0:
                return navigate(`/magazine/${projectId}`, {});
            case 1:
                return navigate(`/brand/${projectId}`, {});
            case 2:
                return navigate(`/film/${projectId}`, {});
        }
    }, [])

    const handleSelectImage = (src:string|null) => {
        setSelectImage(src);
    }
    
    useEffect(() => {
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
                    break;
                case 2:
                    setTitle("FILM")
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
                    <div className="title">{title}</div>
                    <ImgList isMobile={isMobileVal}>
                        {IMAGE_DETAIL_LIST[pageType][projectId].map( (v:any, k:any) => {
                            return <ImgColumn isMobile={isMobileVal} key={k}>
                                {v.map( (e:any, kk:any) => {
                                    return <ImgRow 
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
                    <ImgList isMobile={isMobileVal}>
                        {IMAGE_LIST[pageType].map( (e, k) => {
                            return <ImgColumn isMobile={isMobileVal} key={k}>
                                {e.map( (v, kk) => {
                                    return <ImgRow
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
                    </ImgList>
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
    "/img/main/magazine.jpg",
    "/img/main/magazine.jpg",
]

const IMAGE_DETAIL_LIST:any = [{
    1: [ [ ["EQ_210913D_0550.jpg", 1] ] ],
    2: [
        [
            ["O_201201D_3337.jpg", 1],
            ["O_201201D_3413.jpg", 2]
        ],
        [
            ["O_201201D_3592.jpg", 2],
            ["O_201201D_3648.jpg", 1]
        ],
        [
            ["O_201201D_3656.jpg", 1],
            ["O_201201D_3668.jpg", 2],
        ]
    ],
    3: [
        [
            ["O_200610D_2104.jpg", 1],
            ["O_200610D_2121.jpg", 2],
        ],
        [
            ["O_200610D_2130.jpg", 2],
            ["O_200610D_2137.jpg", 1],
        ],
        [
            ["O_200610D_2167.jpg", 1],
            ["O_200610D_2184.jpg", 2],
        ]
    ],
    4: [
        [
            ["O_200813D_6526.jpg", 1],
            ["O_200813D_6542.jpg", 2],
        ],
        [
            ["O_200813D_6749.jpg", 2],
            ["O_200813D_6760.jpg", 1],
        ],
        [
            ["O_200813D_6772.jpg", 1],
            ["O_200813D_6790.jpg", 2],
        ]
    ],
    5: [
        [
            ["O_200813D_6919.jpg", 1],
            ["O_200813D_6996.jpg", 2],
        ],
        [
            ["O_200813D_7008.jpg", 2],
            ["O_200813D_7022.jpg", 1],
        ],
        [
            ["O_200813D_7174.jpg", 1],
            ["O_200813D_7203.jpg", 2],
        ],
        [
            ["O_200813D_7249.jpg", 1]
        ]
    ],
    6: [
        [
            ["O_200615D_2339.jpeg", 1],
            ["O_200615D_2390.jpg", 2],
        ],
        [
            ["O_200615D_2413.jpg", 2],
            ["O_200615D_2512.jpg", 1],
        ]
    ],
    7: [
        [
            ["O_200713D_3805.jpg", 1],
            ["O_200713D_3891.jpg", 2],
        ],
        [
            ["O_200713D_4038.jpg", 2],
            ["O_200713D_4124.jpg", 1],
        ]
    ],
    8: [
        [
            ["O_201008D_8417.jpg", 1],
            ["O_201008D_8437.jpg", 2],
        ],
        [
            ["O_201008D_8712.jpg", 2],
            ["O_201008D_8741.jpg", 1],
        ]
    ],
    9: [
        [
            ["O_200907D_7851.jpg", 1],
            ["O_200907D_8137.jpg", 2],
        ],
        [
            ["O_200907D_8197.jpg", 2],
            ["O_200907D_8232.jpg", 1],
        ],
        [
            ["O_200907D_8282.jpg", 1],
        ]
    ],
    10: [ [ ["O_200714D_4703.jpg", 1] ] ],
    11: [
        [
            ["O_200611D_1873.jpg", 1],
            ["O_200611D_1887.jpg", 2],
        ],
        [
            ["O_200611D_1893_E01.jpg", 2],
            ["O_200611D_1903_E01.jpg", 1],
        ],
        [
            ["O_200611D_1997_E01.jpg", 1],
            ["O_200611D_2025_E02.jpg", 2],
        ],
        [
            ["O_200611D_2076.jpg", 1]
        ]
    ],
    12: [
        [
            ["BM_200508D_02.jpg", 1],
            ["BM_200508D_04.jpg", 2],
        ],
        [
            ["BM_200508D_05.jpg", 2],
            ["BM_200508D_10.jpg", 1],
        ],
        [
            ["BM_200508D_12.jpeg", 1],
            ["BM_200508D_15.jpg", 2],
        ],
        [
            ["BM_200508D_16.jpg", 1]
        ]
    ],
    13: [
        [
            ["O_201207D_0006.jpg", 1],
            ["O_201207D_0154.jpeg", 2],
        ],
        [
            ["O_201207D_0194.jpg", 2],
            ["O_201207D_0267.jpg", 1],
        ],
        [
            ["O_201207D_0305.jpg", 1]
        ]
    ],
    14: [
        [
            ["O_200714D_4189.jpg", 1],
            ["O_200714D_4269.jpg", 2],
        ],
        [
            ["O_200714D_4275.jpg", 2],
            ["O_200714D_4283.jpg", 1],
        ],
        [
            ["O_200714D_4293.jpg", 1]
        ]
    ],
    15: [ [ ["O_201006D_4170_E02.jpg", 1] ] ],
    16: [
        [
            ["O_201208D_0026.jpg", 1],
            ["O_201208D_0274.jpg", 2],
        ],
        [
            ["O_201208D_0392.jpg", 2],
            ["O_201208D_0413.jpg", 1],
        ]
    ],
    17: [
        [
            ["O_200414_1361.jpg", 1],
            ["O_210111D_0223.jpg", 2],
        ],
        [
            ["O_210111D_0263.jpg", 2],
            ["O_210111D_0323.jpg", 1],
        ]
    ],
    18: [
        [
            ["O_200706D_2540.jpg", 1],
            ["O_200706D_2579.jpg", 2],
        ],
        [
            ["O_200706D_2717.jpg", 2],
            ["O_200706D_2773.jpg", 1],
        ],
        [
            ["O_200706D_2877.jpg", 1],
        ]
    ],
    19: [
        [
            ["O_200615D_2158.jpg", 1],
            ["O_200615D_2189.jpeg", 2],
        ],
        [
            ["O_200615D_2221.jpg", 2],
            ["O_200615D_2256.jpg", 1],
        ],
        [
            ["O_200615D_2288.jpg", 1],
            ["O_200615D_2293.jpg", 2],
        ],
        [
            ["O_200615D_2296.jpg", 1],
        ]
    ],
    20: [
        [
            ["O_200104D_0019.jpg", 1],
            ["O_200104D_0146.jpg", 2],
        ],
        [
            ["O_200104D_0286.jpg", 2],
            ["O_200104D_0332.jpg", 1],
        ]
    ],
    21: [
        [
            ["O_201103D_0781.jpg", 1],
            ["O_201103D_0810.jpg", 2],
        ]
    ],
    22: [
        [
            ["O_200807D_5924.jpg", 1],
            ["O_200807D_6114.jpeg", 2],
        ],
        [
            ["O_200807D_6148.jpg", 2],
            ["O_200807D_6312.jpg", 1],
        ],
        [
            ["O_200807D_6368.jpg", 1]
        ]
    ],
},{

},{

}]

const IMAGE_LIST = [
    [
        [
            [1, "EQ_210913D_0550.jpg", "에스콰이어 첸트로", 1],
            [2, "O_201201D_3413.jpg", "올리브 갈루팡", 1]
        ],
        [
            [3, "O_200610D_2104.jpg", "올리브 강릉 서지초가뜰", 1],
            [4, "O_200813D_6526.jpg", "올리브 국빈관", 2]
        ],
        [
            [5, "O_200813D_6919.jpg", "올리브 NM", 1],
            [6, "O_200615D_2339.jpeg", "올리브 남영동 초원", 1]
        ],
        [
            [7, "O_200713D_3805.jpg", "올리브 네기규동", 2],
            [8, "O_201008D_8712.jpg", "올리브 노티드", 1],
        ],
        [
            [9, "O_200907D_8197.jpg", "올리브 핸드크래프트 도예가", 1],
            [10, "O_200714D_4703.jpg", "올리브 목탄장", 2],
        ],
        [
            [12, "BM_200508D_02.jpg", "올리브 백곰막걸리", 2],
            [11, "O_200611D_1997_E01.jpg", "올리브 박종선", 1],
        ],
        [
            [14, "O_200714D_4189.jpg", "올리브 클랩피자", 1],
            [13, "O_201207D_0267.jpg", "올리브 비전스트롤", 2],
        ],
        [
            [15, "O_201006D_4170_E02.jpg", "올리브 심플레시피", 2],
            [16, "O_201208D_0274.jpg", "올리브 에그앤플라워", 1]
        ],
        [
            [17, "O_210111D_0323.jpg", "올리브 에빗", 1],
            [18, "O_200706D_2717.jpg", "올리브 핸드크래프트 유리공예디자이너", 2]
        ],
        [
            [19, "O_200615D_2158.jpg", "올리브 쿠나", 2],
            [20, "O_200104D_0286.jpg", "올리브 큔", 1]
        ],
        [
            [22, "O_200807D_6114.jpeg", "올리브 황동 디자이너", 1],
            [21, "O_201103D_0781.jpg", "올리브 테이스트", 2],
        ]
    ],
    [],
    [],
]

export default ProjectList;