import { useContext } from "react";
import DiaryItem from "./DiaryItem";
import { DiaryStateContext } from "./App";

const DiaryList = () => {

  const diaryList = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <h2>할일 리스트</h2>
      <h4>{diaryList.length}개의 항목이 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
          ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps={
  diaryList: [],
}

export default DiaryList;
