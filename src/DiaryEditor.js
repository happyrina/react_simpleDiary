// 필요한 React 기능들을 가져옴
import React, { useRef, useState } from "react";

const DiaryEditor = ({onCreate}) => {

  // 작성자와 내용 입력 필드에 직접 접근하기 위한 참조 변수
  const authorInput = useRef();
  const contentInput = useRef();

  // 컴포넌트의 로컬 상태 (작성자, 내용, 감정)를 관리하는 state
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  // 인풋 필드의 값이 변경될 때 호출되는 함수
  const handleChangeState = (e) => {
    console.log(e.target.name);
    console.log(e.target.value); 

    // 현재 상태에 변경된 값을 병합
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // '저장하기' 버튼 클릭 시 호출되는 함수
  const handleSubmit = () => {
    // 작성자의 길이가 1 미만이면 경고와 함께 리턴
    if(state.author.length < 1){
      authorInput.current.focus();
      return;
    }

    // 내용의 길이가 5 미만이면 경고와 함께 리턴
    if(state.content.length < 5){
      contentInput.current.focus();
      return;
    }

    // onCreate 함수를 통해 App 컴포넌트에 일기 정보 전달
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");
    
    // 상태 초기화
    setState({
      author: "",
      content: "",
      emotion: 1,
    })
  };

  // 컴포넌트의 UI를 반환
  return(
    <div className="DiaryEditor">
      <h2>오늘의 할일</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
          />
      </div>
      <div>
        <textarea
        ref={contentInput}
        name="content"
        value={state.content}
        onChange={handleChangeState}
        />
      </div>
      <div>
        <select
        name="emotion"
        value={state.emotion}
        onChange={handleChangeState}
        >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>할일 저장하기</button>
      </div>
    </div>
  );
};

// DiaryEditor 컴포넌트를 다른 파일에서 사용할 수 있도록 export
export default DiaryEditor;
