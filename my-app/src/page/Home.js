import React from 'react';
import styles from './Home.module.css';

const Home = () =>{
    return (
    <div>
        <header className="title">냉장고를 야금야금</header>
        <div className="fridge">
            <div className="door left-door">
                <div className="foodBox">
                    <div className="textAreaRight textArea">원하는 스타일을 선택하세요.</div>
                    <div className="inputAreaRight inputArea checkbox-buttons">
                        <input type="checkbox" id="korean" name="food" value="한식">
                            <label for="korean">한식</label>

                            <input type="checkbox" id="chinese" name="food" value="중식">
                                <label for="chinese">중식</label>

                                <input type="checkbox" id="japanese" name="food" value="일식">
                                    <label for="japanese">일식</label>

                                    <input type="checkbox" id="western" name="food" value="양식">
                                        <label for="western">양식</label>

                                        <input type="checkbox" id="noPreference" name="food" value="상관없음">
                                            <label for="noPreference">상관없음</label>
                                        </div>
                                    </div>

                                    <div className="foodBox">
                                        <div className="textArea textAreaRight">요리 가능 시간을 선택하세요.</div>
                                        <div className="inputArea inputAreaRight">
                                            <input id="inputRange" type="range" min="5" max="60" className="inputRange" value="5">
                                                <p className="time"><span id="time">5</span>분</p>
                                                <button id="nextPageBtn" className="nextPageBtn">선택완료</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="handle" id="open-handle"></div>
                                <div className="foodBoxLeft1 foodBoxLeft">
                                    <div className="textArea">냉장고 재료를 3가지 이상 골라주세요.</div>
                                    <div className="inputArea">
                                        <input type="text" className="inputFood">
                                            <input type="text" className="inputFood">
                                                <input type="text" className="inputFood">
                                                    <input type="text" className="inputFood">
                                                        <input type="text" className="inputFood">
                                                            <input type="text" className="inputFood">
                                                            </div>
                                                        </div>
                                                        <div className="foodBoxLeft2 foodBoxLeft">
                                                            <div className="textArea">조리 도구를 한 개 이상 적어주세요.</div>
                                                            <div className="inputArea  checkbox-buttons">
                                                                <input type="text" className="inputFood">
                                                                    <input type="text" className="inputFood">
                                                                        <input type="text" className="inputFood">
                                                                            <input type="checkbox" id="nomatter" name="food" value="양식">
                                                                                <label for="nomatter">상관없음</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                            </div>
            </div>
    )
}

export default Home;