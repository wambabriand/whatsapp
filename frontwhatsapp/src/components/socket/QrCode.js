

function QrCode (props) {
    const { src } = props;
    console.log("================")
    console.log(src);
  return (
    <div className="App">
        <img src={src ? src : ""} alt="no dddddddddd"></img>
    </div>
  );
}

export default QrCode;
