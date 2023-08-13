import DiaryItem from "./DiaryItem";

const DiaryList = ({ onEdit, onRemove, diaryList }) => {

  return (
    <div className="DiaryList">
      <h2>할일 리스트</h2>
      <h4>{diaryList.length}개의 항목이 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove}/>
          ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps={
  diaryList: [],
}

export default DiaryList;
