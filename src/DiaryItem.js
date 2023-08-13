// 필요한 React 기능들을 가져옴
import {useRef, useState} from "react";

const DiaryItem = ({onEdit, onRemove, author, content, create_date, emotion, id}) => {

  // 수정 모드인지 아닌지를 결정하는 상태 (기본값: false)
  const [isEdit, setIsEdit] = useState(false);
  // isEdit 상태를 토글하는 함수
  const toggleIsEdit = () => setIsEdit(!isEdit);

  // 로컬 상태로 일기의 내용을 관리 (기본값: props로 받은 content)
  const [localContent, setLocalContent] = useState(content);

  // textarea의 참조를 위한 useRef
  const localContentInput = useRef();

  // 일기 삭제 버튼 클릭 시 호출되는 함수
  const handleRemove = () => {
    if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
      onRemove(id);
    }
  };

  // 수정 모드에서 나가기 버튼 클릭 시 호출되는 함수
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  }

  // 일기 수정 완료
  const handleEdit = () => {
    // 수정할 내용의 길이가 5 미만이면, 포커스를 주고 리턴
    if(localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    // 사용자에게 수정 여부를 확인
    if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      // 일기 수정
      onEdit(id, localContent);
      // 수정 모드 종료
      toggleIsEdit();
    }
  }

  // 컴포넌트 렌더링
  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          작성자 : {author} | 감정지수 : {emotion}
        </span>
        <br/>
        <span className="date">{new Date(create_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? ( 
          <>
            <textarea ref={localContentInput} value={localContent} onChange={(e) => setLocalContent(e.target.value)}/>
          </>
        ) : (
          <> {content} </>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};


// DiaryItem 컴포넌트를 다른 파일에서 사용할 수 있도록 export
export default DiaryItem;
