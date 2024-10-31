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
    const fridgeRef = useRef(null); const [hasClicked, setHasClicked] = useState(false); // 클릭 여부 상태 추가
    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [inputValue3, setInputValue3] = useState("");
    const [inputValue4, setInputValue4] = useState("");
    const [inputValue5, setInputValue5] = useState("");
    const [inputValue6, setInputValue6] = useState("");

    const toggleFridge = () => {
        if (hasClicked) return; // 이미 클릭한 경우 함수 종료
        setHasClicked(true); // 클릭한 경우 상태 업데이트
        setFridgeOpen(prev => !prev);
        if (fridgeRef.current) {
            fridgeRef.current.style.transform = isFridgeOpen ? 'translateX(0)' : 'translateX(-50%)';
        }
    };
    /* ====== 수빈 작성 24.10.30 17:40~*/
    const [foodCheckBoxes, setFoodCheckBoxes] = useState({
        optionKorean : false,
        optionChinese : false,
        optionJapanese : false,
        optionWestern : false,
        optionNone : false
    })

    /*체크박스 값 변경 핸들러 */
    const handleFoodCheckBoxChange = (event) =>{
        const {name, checked} = event.target;
        setFoodCheckBoxes((prevFoodCheckBoxes)=>({
            ...prevFoodCheckBoxes,
            [name]: checked,
        }))
    }
    console.log(foodCheckBoxes)

    //true인 키의 이름을 한글로 변환
    const foodCheckLabels = Object.entries(foodCheckBoxes)
        .filter(([key,value])=>value)
        .map(([key])=>{
            switch (key){
                case 'optionKorean':
                    return '한식'
                case 'optionChinese':
                    return '중식'
                case 'optionJapanese':
                    return '일식'
                case 'optionWestern':
                    return '양식'
                case 'optionNone':
                    return '없음'
                default:
                    return '';
            }
        })
    console.log(foodCheckLabels)
    const handleRangeChange = (event) => {
        setCookTime(event.target.value);
    };
    ///======== 수빈 작성 끝 ====================================================


    /// ===== 기범 작성 시작 ====================================================
    //전체 전달값
    const [totalElement, setTotalElement] = useState({});
    
    //전체 전달값(tool)
    const setTotalTool = (event) => {
        const selectedtool = event.target.name;
        setTotalElement({
            tool: selectedtool,
            check_food_style : foodCheckLabels,
        })
    }
    //전체 전달값(tool)

    
    //체크박스 하나만
    const [toggleTools, setToggleTools] = useState({
        microwave: false,
        oven: false,
        none: false,
        nomatter: false,
    });

    const toolsToggling = (event) => {
        const { name, checked } = event.target;

        setToggleTools({
            microwave: false,
            oven: false,
            none: false,
            nomatter: false,
            [name]: checked,
        });
    };
    /// =======기범작성 끝 =====================================================




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

            // 냉장고 재료 밸류값 
            const resultInput = [inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6];
            let sendInput = [];
            // 밸류값이 있으면 sendInput 에 넣기
            resultInput.forEach((v, i) => {
                if (resultInput[i] !== '') {
                    sendInput.push(resultInput[i]);
                }
            })
            // 잔고로 보내는 코드
            const submit = async () => {
                try {
                    const response = await fetch("http://localhost:8000/data/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            input_food: sendInput,
                            check_food_tools :totalElement,
                        }),
                    });
                    const data = await response.json();
                    console.log(data.message);
                } catch (err) {
                    console.error("ERROR :", err);
                }
            }
            submit();
        }
    };

    return (
        <div>
            <header className={styles.title}>냉장고를 야금야금</header>
            <Fridge className={`${styles.fridge} ${isFridgeOpen ? styles.open : ''} ${fridgeRef.current?.classList.contains('shake') ? 'shake' : ''}`} ref={fridgeRef}>
                <div className={`${styles.door} ${styles.left}`}>
                    <div className={styles.foodBox}>
                        <div className={`${styles.textAreaRight} ${styles.textArea}`}>원하는 스타일을 선택해주세요.</div>
                        <div className={`${styles.inputAreaRight} ${styles.inputArea} ${styles.checkbox_buttons}`}>
                        <input 
                                type="checkbox" 
                                id="korean" 
                                name="optionKorean" 
                                checked={foodCheckBoxes.optionKorean} 
                                onChange={handleFoodCheckBoxChange} 
                                value="한식" 
                            />
                            <label htmlFor="korean">한식</label>
                            <input 
                                type="checkbox" 
                                id="chinese" 
                                name="optionChinese" 
                                checked={foodCheckBoxes.optionChinese}
                                onChange={handleFoodCheckBoxChange}  
                                value="중식" 
                            />
                            <label htmlFor="chinese">중식</label>
                            <input 
                                type="checkbox" 
                                id="japanese" 
                                name="optionJapanese" 
                                checked={foodCheckBoxes.optionJapanese} 
                                onChange={handleFoodCheckBoxChange}
                                value="일식" 
                            />
                            <label htmlFor="japanese">일식</label>
                            <input 
                                type="checkbox" 
                                id="western" 
                                name="optionWestern" 
                                checked={foodCheckBoxes.optionWestern}
                                onChange={handleFoodCheckBoxChange} 
                                value="양식" 
                            />
                            <label htmlFor="western">양식</label>
                            <input 
                                type="checkbox" 
                                id="noPreference" 
                                name="optionNone" 
                                checked={foodCheckBoxes.optionNone} 
                                onChange={handleFoodCheckBoxChange}
                                value="상관없음" 
                            />
                            <label htmlFor="noPreference">상관없음</label>
                        </div>
                    </div>
                    <div className={styles.foodBox}>
                        <div className={`${styles.textArea} ${styles.textAreaRight}`}>요리 가능 시간을 선택해주세요.</div>
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
                            <p className={styles.time}>{cookTime + ' 분'}</p>
                            <button className={styles.nextPageBtn} onClick={handleNextPage}><span>선택완료</span></button>
                        </div>
                    </div>
                </div>

                <div className={styles.handle} onClick={toggleFridge}></div>
                <div className={`${styles.foodBoxLeft1} ${styles.foodBoxLeft}`}>
                    <div className={styles.textArea}>냉장고 재료를 3가지 이상 골라주세요.</div>
                    <div className={styles.inputArea}>
                        <input type="text" className={styles.inputFood} value={inputValue1} onChange={(e) => { setInputValue1(e.target.value) }} />
                        <input type="text" className={styles.inputFood} value={inputValue2} onChange={(e) => { setInputValue2(e.target.value) }} />
                        <input type="text" className={styles.inputFood} value={inputValue3} onChange={(e) => { setInputValue3(e.target.value) }} />
                        <input type="text" className={styles.inputFood} value={inputValue4} onChange={(e) => { setInputValue4(e.target.value) }} />
                        <input type="text" className={styles.inputFood} value={inputValue5} onChange={(e) => { setInputValue5(e.target.value) }} />
                        <input type="text" className={styles.inputFood} value={inputValue6} onChange={(e) => { setInputValue6(e.target.value) }} />
                    </div>
                </div>
                <div className={`${styles.foodBoxLeft2} ${styles.foodBoxLeft}`}>
                    <div className={styles.textArea}>조리 도구를 한 개 이상을 선택해주세요.</div>
                    <div className={`${styles.inputArea} ${styles.checkbox_buttons}`}>
                    <input type="checkbox" id="microwave" name="microwave" value="전자레인지" checked={toggleTools.microwave} onChange={setTotalTool} onClick={toolsToggling}/>
                        <label htmlFor="microwave">전자레인지</label>
                        <input type="checkbox" id="oven" name="oven" value="오븐" checked={toggleTools.oven} onChange={setTotalTool} onClick={toolsToggling}/>
                        <label htmlFor="oven">오븐</label>
                        <input type="checkbox" id="none" name="none" value="없음" checked={toggleTools.none} onChange={setTotalTool} onClick={toolsToggling}/>
                        <label htmlFor="none">없음</label>
                        <input type="checkbox" id="nomatter" name="nomatter" value="상관없음" checked={toggleTools.nomatter} onChange={setTotalTool} onClick={toolsToggling}/>
                        <label htmlFor="nomatter">상관없음</label>
                    </div>
                </div>
            </Fridge>
        </div>
    );
};

export default Home;
