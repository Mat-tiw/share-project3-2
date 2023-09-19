import "../styles/fetchimg.css";

export default function FetchToImgList(props) {
  return (
    <div className="card-from-img-list">
      <div className="card-body-img-list">
        <img src={props.img} alt="" />
      </div>
    </div>
  );
}
