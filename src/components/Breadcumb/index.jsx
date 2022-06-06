import React from "react";

function Breadcumb({title , subTitle , text}){

  return(
    <div className="breadcumb-area ">
      {/* breadcumb content */}
      <div className="breadcumb-content about-before">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <nav aria-label="breadcrumb" className="breadcumb--con text-center">
                <h2 className="w-text title wow fadeInUp" data-wow-delay="0.2s">{title}</h2>
                <ol className="breadcrumb justify-content-center wow fadeInUp" data-wow-delay="0.4s">
                  <li className="breadcrumb-item"><a href="/#">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">{subTitle}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Breadcumb)