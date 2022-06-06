
const OperSec = ({
  index,
  buyHandler,
  ClassBtn="readon w-100 hover-shape VIEW_Projects_Btn mb-2",
  nameOper=""
}) => {
    
  return (
    <div className="button-wrapper buttonWrapperPadd">
      <button value={index} onClick={buyHandler} type="button" className={ClassBtn}> {nameOper}</button>
    </div>
  );
}

export default OperSec;