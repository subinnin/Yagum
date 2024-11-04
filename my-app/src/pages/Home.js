import React, { useState, useRef } from 'react';
import styles from './Home.module.css';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom'
import hamImage from '../images/햄.webp'; // 이미지 경로
import potatoImage from '../images/감자.webp';
import eggImage from '../images/계란.webp';
import fishImage from '../images/고등어.webp';
import kimchiImage from '../images/김치.webp';
import chickenImage from '../images/닭고기.webp';
import greenOnionImage from '../images/대파.webp';
import porkImage from '../images/돼지고기.webp';
import dduckImage from '../images/떡.webp';
import garlicImage from '../images/마늘.webp';
import beefImage from '../images/소고기.webp';
import onionImage from '../images/양파.webp';




// Shake animation
const shakeAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(3deg); }
  50% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
  100% { transform: rotate(0deg); }
`;

const Fridge = styled.div`
  &.shake {
    animation: ${shakeAnimation} 0.5s ease infinite; /* 애니메이션 무한 반복 */
  }
`;

const Home = () => {
    const navigate = useNavigate();

    const [isFridgeOpen, setFridgeOpen] = useState(false);
    const fridgeRef = useRef(null); const [hasClicked, setHasClicked] = useState(false); // 클릭 여부 상태 추가
 

    const toggleFridge = () => {
        if (hasClicked) return; // 이미 클릭한 경우 함수 종료
        setHasClicked(true); // 클릭한 경우 상태 업데이트
        setFridgeOpen(prev => !prev);
        if (fridgeRef.current) {
            fridgeRef.current.style.transform = isFridgeOpen ? 'translateX(0)' : 'translateX(-50%)';
        }
    };
    

    ///======== 수빈 작성 끝 ====================================================


    /// ===== 기범 작성 시작 ====================================================
    //전체 전달값
    const [totalElement, setTotalElement] = useState({
        mainIngredient: null,
        subIngredient: null
    });


    /// ========수빈 작성 ======================================================
    const [activeMainItems, setActiveMainItems] = useState([]);
    
    const [activeSubItems, setActiveSubItems] = useState([]);
    const handleSubClick = (item) =>{
        setActiveSubItems(prev => {
            if (prev.includes(item)) {
                // 이미 활성화된 경우 클릭 시 비활성화
                return prev.filter(i => i !== item);
            } else if (prev.length < 2) {
                // 두 개 미만일 경우 활성화
                return [...prev, item];
            } else {
                return prev; // 두 개 이상일 경우 아무 변화 없음
            }
        });
    }
    const handleMainClick = (item) =>{
        setActiveMainItems(prev => {
            if (prev.includes(item)) {
                // 이미 활성화된 경우 클릭 시 비활성화
                return prev.filter(i => i !== item);
            } else if (prev.length < 1) {
                // 한 개 미만일 경우 활성화
                return [...prev, item];
            } else {
                return prev; // 두 개 이상일 경우 아무 변화 없음
            }
        });
    }
    console.log(activeMainItems)
    console.log(activeSubItems)


    /// 다음 페이지로 넘어가는 것 =========================
    const handleNextPage = () => {
        setFridgeOpen(false);
        if (fridgeRef.current) {

            fridgeRef.current.classList.remove("open");
            fridgeRef.current.style.transform = 'translateX(0)';


            // 흔들기 시작
            const moveFidge = () => { fridgeRef.current.classList.add("shake"); }

            let intervalId;
            intervalId = setInterval(moveFidge, 1000);
            setTimeout(() => {
                clearInterval(intervalId);
            }, 1000);

            const nextPage = () => {
                navigate('/menu')
            }
            let interval;
            interval = setInterval(nextPage, 5000);
            setTimeout(() => {
                clearInterval(interval)
            }, 5000);

        
            //잔고로 보내는 코드
            const submit = async () => {
                try {
                    const response = await fetch("http://localhost:8000/data/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            main_food : activeMainItems,//---------------------------------  여기 수정
                            sub_foods : activeSubItems
                        }),
                    });
                    const data = await response.json();
                    console.log(data);
                } catch (err) {
                    console.error("ERROR:", err);
                }
            }
            submit();
        }
        // console.log(totalElement)
    };


    return (
        <div>
            <header className={styles.title}>냉장고를 야금야금</header>
            <Fridge className={`${styles.fridge} ${isFridgeOpen ? styles.open : ''} ${fridgeRef.current?.classList.contains('shake') ? 'shake' : ''}`} ref={fridgeRef}>
                <div onClick={toggleFridge} className={`${styles.door} ${styles.left}`}>
                    <div className={styles.foodBox}>
                        <div className={`${styles.textAreaRight} ${styles.textArea}`}>부재료를 2가지 선택해주세요.</div>
                        <div className={`${styles.inputAreaRight} ${styles.inputArea2} ${styles.checkbox_buttons}`}>
                            <div className={styles.container2}>
                            <img src={potatoImage} className={`${styles.box2} ${activeSubItems.includes('감자') ? styles.active : ''}`} onClick={()=>handleSubClick('감자')}></img>
                                <div className={styles.textR}>감자</div>
                            </div>
                            <div className={styles.container2}>
                            <img src={kimchiImage} className={`${styles.box2} ${activeSubItems.includes('김치') ? styles.active : ''}`} onClick={()=>handleSubClick('김치')}></img>
                                <div className={styles.textR}>김치</div>
                            </div>
                            <div className={styles.container2}>
                                <img src={greenOnionImage} className={`${styles.box2} ${activeSubItems.includes('대파') ? styles.active : ''}`} onClick={()=>handleSubClick('대파')}></img>
                                    <div className={styles.textR}>대파</div>
                            </div>
                            <div className={styles.container2}>
                                <img src={dduckImage} className={`${styles.box2} ${activeSubItems.includes('떡') ? styles.active : ''}`} onClick={()=>handleSubClick('떡')}></img>
                                    <div className={styles.textR}>떡</div>
                            </div>
                            <div className={styles.container2}>
                                <img src={garlicImage} className={`${styles.box2} ${activeSubItems.includes('마늘') ? styles.active : ''}`} onClick={()=>handleSubClick('마늘')}></img>
                                    <div className={styles.textR}>마늘</div>
                            </div>
                            <div className={styles.container2}>
                                <img src={onionImage} className={`${styles.box2} ${activeSubItems.includes('양파') ? styles.active : ''}`} onClick={()=>handleSubClick('양파')}></img>
                                    <div className={styles.textR}>양파</div>
                            </div>
                        
                        </div>
                    </div>
                </div>

                <div className={styles.handle} onClick={toggleFridge}></div>
                <div className={`${styles.foodBoxLeft1} ${styles.foodBoxLeft}`}>
                    <div className={styles.textArea}>주재료를 1가지 선택해주세요.</div>
                    <div className={styles.inputArea}>
                    <div className={styles.container}>
                        <img src={porkImage} className={`${styles.box} ${activeMainItems.includes('돼지고기') ? styles.active : ''}`} onClick={()=>handleMainClick('돼지고기')}></img>
                            <div className={styles.text}>돼지고기</div>
                        </div>
                        <div className={styles.container}>
                        <img src={beefImage} className={`${styles.box} ${activeMainItems.includes('소고기') ? styles.active : ''}`} onClick={()=>handleMainClick('소고기')}></img>
                            <div className={styles.text}>소고기</div>
                        </div>
                        <div className={styles.container}>
                            <img src={chickenImage} className={`${styles.box} ${activeMainItems.includes('닭고기') ? styles.active : ''}`} onClick={()=>handleMainClick('닭고기')}></img>
                                <div className={styles.text}>닭고기</div>
                        </div>
                        <div className={styles.container}>
                            <img src={fishImage} className={`${styles.box} ${activeMainItems.includes('생선') ? styles.active : ''}`} onClick={()=>handleMainClick('생선')}></img>
                                <div className={styles.text}>생선</div>
                        </div>
                        <div className={styles.container}>
                            <img src={eggImage} className={`${styles.box} ${activeMainItems.includes('계란') ? styles.active : ''}`} onClick={()=>handleMainClick('계란')}></img>
                                <div className={styles.text}>계란</div>
                        </div>
                        <div className={styles.container}>
                            <img src={hamImage} className={`${styles.box} ${activeMainItems.includes('햄') ? styles.active : ''}`} onClick={()=>handleMainClick('햄')}></img>
                                <div className={styles.text}>햄</div>
                        </div>
                        <button className={styles.nextPageBtn} onClick={handleNextPage}><span>선택완료</span></button>
                    </div>
                </div>
            </Fridge>
        </div>
    );
    // console.log(totalElement)
}

export default Home;