import React, { useState, useRef } from 'react';
import styles from './Home.module.css';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom'

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
    const [cookTime, setCookTime] = useState(5);
    const fridgeRef = useRef(null);const [hasClicked, setHasClicked] = useState(false); // 클릭 여부 상태 추가

    const toggleFridge = () => {
        if (hasClicked) return; // 이미 클릭한 경우 함수 종료
        setHasClicked(true); // 클릭한 경우 상태 업데이트
        setFridgeOpen(prev => !prev);
        if (fridgeRef.current) {
            fridgeRef.current.style.transform = isFridgeOpen ? 'translateX(0)' : 'translateX(-20rem)';            
        }
    };

    const handleRangeChange = (event) => {
        setCookTime(event.target.value);
    };

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

            const nextPage =()=>{
                navigate('/menu')
            }
            let interval;
            interval = setInterval(nextPage,5000);
            setTimeout(()=>{
                clearInterval(interval)
            },5000)
            

            

            // 10초 후 흔들림 종료
            //   setTimeout(() => {
            //     fridgeRef.current.classList.remove("shake");
            //   }, 10000); // 10초 동안 흔들기
        }
    };

    return (
        <div>
            <header className={styles.title}>냉장고를 야금야금</header>
            <Fridge className={`${styles.fridge} ${isFridgeOpen ? styles.open : ''} ${fridgeRef.current?.classList.contains('shake') ? 'shake' : ''}`} ref={fridgeRef}>
                <div className={`${styles.door} ${styles.left}`}>
                    <div className={styles.foodBox}>
                        <div className={`${styles.textAreaRight} ${styles.textArea}`}>원하는 스타일을 선택하세요.</div>
                        <div className={`${styles.inputAreaRight} ${styles.inputArea} ${styles.checkbox} ${styles.buttons}`}>
                            <input type="checkbox" id="korean" name="food" value="한식" />
                            <label htmlFor="korean">한식</label>
                            <input type="checkbox" id="chinese" name="food" value="중식" />
                            <label htmlFor="chinese">중식</label>
                            <input type="checkbox" id="japanese" name="food" value="일식" />
                            <label htmlFor="japanese">일식</label>
                            <input type="checkbox" id="western" name="food" value="양식" />
                            <label htmlFor="western">양식</label>
                            <input type="checkbox" id="noPreference" name="food" value="상관없음" />
                            <label htmlFor="noPreference">상관없음</label>
                        </div>
                    </div>
                    <div className={styles.foodBox}>
                        <div className={`${styles.textArea} ${styles.textAreaRight}`}>요리 가능 시간을 선택하세요.</div>
                        <div className={`${styles.inputArea} ${styles.inputAreaRight}`}>
                            <input
                                id="inputRange"
                                type="range"
                                min="5"
                                max="60"
                                className={styles.inputRange}
                                value={cookTime}
                                onChange={handleRangeChange}
                            />
                            <p className={styles.time}><span>{cookTime}</span>분</p>
                            <button className={styles.nextPageBtn} onClick={handleNextPage} style={{ cursor: hasClicked ? 'default' : 'pointer' }}>선택완료</button>
                        </div>
                    </div>
                </div>

                <div className={styles.handle} onClick={toggleFridge}></div>
                <div className={`${styles.foodBoxLeft1} ${styles.foodBoxLeft}`}>
                    <div className={styles.textArea}>냉장고 재료를 3가지 이상 골라주세요.</div>
                    <div className={styles.inputArea}>
                        <input type="text" className={styles.inputFood} />
                        <input type="text" className={styles.inputFood} />
                        <input type="text" className={styles.inputFood} />
                        <input type="text" className={styles.inputFood} />
                        <input type="text" className={styles.inputFood} />
                        <input type="text" className={styles.inputFood} />
                    </div>
                </div>
                <div className={`${styles.foodBoxLeft2} ${styles.foodBoxLeft}`}>
                    <div className={styles.textArea}>조리 도구를 한 개 이상 적어주세요.</div>
                    <div className={`${styles.inputArea} ${styles.checkbox} ${styles.buttons}`}>
                        <input type="text" className={styles.inputFood} />
                        <input type="text" className={styles.inputFood} />
                        <input type="text" className={styles.inputFood} />
                        <input type="checkbox" id="nomatter" name="food" value="상관없음" />
                        <label htmlFor="nomatter">상관없음</label>
                    </div>
                </div>
            </Fridge>
        </div>
    );
};

export default Home;
