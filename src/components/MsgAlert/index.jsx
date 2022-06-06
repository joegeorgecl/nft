import React from "react"

import {
  massageImg
} from "../../utils/allImgs"


const MsgAlert = ({
  title="",
  text=""
}) => {

  return (
      <div className="col-12 col-md-8 offset-md-2">
          <div className="who-we-contant massage br-50">
              <div className="dream-dots text-center">
                  <img src={massageImg} className="m-auto " alt="" />
              </div>
              <h4 className="bold text-dark" data-wow-delay="0.3s">{title}</h4>
              <p className="text-dark">{text}</p>
          </div>
      </div>
  );
}

export default React.memo(MsgAlert);