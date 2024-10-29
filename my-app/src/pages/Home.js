import React from 'react';
import styles from './Home.module.css';

const Home = () => {
    document.getElementById("open-handle").addEventListener("click", function () {
        const fridge = document.querySelector(".fridge");
        fridge.classList.toggle("open");
        fridge.classList.remove("shake");
        // 문이 열리면 냉장고를 중앙으로 이동
        if (fridge.classList.contains("open")) {
            fridge.style.transform = 'translateX(-20rem)'; // 40px -> 4rem
        } else {
            fridge.style.transform = 'translateX(0)'; 
        }
    });
    const inputRange = document.getElementById('inputRange');
    const timeDisplay = document.getElementById('time');

    inputRange.addEventListener('input', function () {
        timeDisplay.textContent = inputRange.value;
    });
    const nextBtn = document.getElementById("nextPageBtn").addEventListener("click", () => {
        const fridge = document.querySelector(".fridge");
        fridge.classList.remove("open");

        // 문이 열리면 냉장고를 중앙으로 이동
        if (fridge.classList.contains("open")) {
            fridge.style.transform = 'translateX(-20rem)'; // 40px -> 4rem
        } else {
            fridge.style.transform = 'translateX(0)'; // 원래 위치로 돌아옴
            const moveFidge = () => {
                    fridge.classList.add("shake");
                
            }
            let intervalId;
            intervalId = setInterval(moveFidge, 1000);
            setTimeout(() => {
                clearInterval(intervalId);
            }, 1000);
        }
    });
    return (
        <div>
            <header className={styles.title}>냉장고를 야금야금</header>
            <div className={styles.fridge}>
                <div className={`${styles.door} ${styles.left} ${styles.door}`}>
                    <div className={styles.foodBox}>
                        <div className={`${styles.textAreaRight} ${styles.textArea}`}>원하는 스타일을 선택하세요.</div>
                        <div className={`${styles.inputAreaRight} ${styles.inputArea} ${styles.checkbox} ${styles.buttons}`}>
                            <input type="checkbox" id="korean" name="food" value="한식"></input>
                            <label for="korean">한식</label>
                            <input type="checkbox" id="chinese" name="food" value="중식"></input>
                            <label for="chinese">중식</label>
                            <input type="checkbox" id="japanese" name="food" value="일식"></input>
                            <label for="japanese">일식</label>
                            <input type="checkbox" id="western" name="food" value="양식"></input>
                            <label for="western">양식</label>
                            <input type="checkbox" id="noPreference" name="food" value="상관없음"></input>
                            <label for="noPreference">상관없음</label>
                        </div>
                    </div>
                    <div className={styles.foodBox}>
                        <div className={`${styles.textArea} ${styles.textAreaRight}`}>요리 가능 시간을 선택하세요.</div>
                        <div className={`${styles.inputArea} ${styles.inputAreaRight}`}>
                            <input id="inputRange" type="range" min="5" max="60" className={styles.inputRange} value="5"></input>
                            <p className={styles.time}><span id="time">5</span>분</p>
                            <button id="nextPageBtn" className={styles.nextPageBtn}>선택완료</button>
                        </div>
                    </div>
                </div>
                <div className={styles.handle} id="open-handle"></div>
                <div className={`${styles.foodBoxLeft1} ${styles.foodBoxLeft}`}>
                    <div className={styles.textArea}>냉장고 재료를 3가지 이상 골라주세요.</div>
                    <div className={styles.inputArea}>
                        <input type="text" className={styles.inputFood}></input>
                        <input type="text" className={styles.inputFood}></input>
                        <input type="text" className={styles.inputFood}></input>
                        <input type="text" className={styles.inputFood}></input>
                        <input type="text" className={styles.inputFood}></input>
                        <input type="text" className={styles.inputFood}></input>
                    </div>
                </div>
                <div className={`${styles.foodBoxLeft2} ${styles.foodBoxLeft}`}>
                    <div className={styles.textArea}>조리 도구를 한 개 이상 적어주세요.</div>
                    <div className={`${styles.inputArea}  ${styles.checkbox} ${styles.buttons}`}>
                        <input type="text" className={styles.nputFood}></input>
                        <input type="text" className={styles.inputFood}></input>
                        <input type="text" className={styles.inputFood}></input>
                        <input type="checkbox" id="nomatter" name="food" value="양식"></input>
                        <label for="nomatter">상관없음</label>
                    </div>
                </div>
            </div>
        </div>
    )}

export default Home;