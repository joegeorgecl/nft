import React from "react";

const SecHead = ({ titleClass="" , title="" , SubTitleClass="b-text", SubTitle="" , textClass="" , text="" }) => {

    return (
        <div className="section-heading text-center">
          {/* Dream Dots */}
          <div className="dream-dots justify-content-center" >
            <span className={titleClass}>{title}</span>
          </div>
          <h2 className={SubTitleClass}>{SubTitle}</h2>
          <p className={textClass}>{text}</p>
        </div>
    );
};

export default React.memo(SecHead);
