import React from "react";

import SecHead from "../SecHead"
import Img from "../Img"

const Faq = ({data , img}) => {

  const {FaqQ} = data;

  return (
    <div className="faq-timeline-area section-padding-100" id="faq">
      <div className="container">
        <SecHead
          title="Our FAQ"
          SubTitleClass=""
          SubTitle="Frequently Questions"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo."
        />
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 offset-lg-0 col-md-8 offset-md-2 col-sm-12">
            <Img img={img} Class="center-block img-responsive" />
          </div>
          <div className="col-12 col-lg-6 col-md-12">
            <div className="dream-faq-area mt-s ">
              <dl className="mb-0">

                {FaqQ?.map((item , key) => (
                  <>
                    <dt key={key} className="wave" data-toggle="collapse" data-target={`#${item.id}`} aria-expanded="false" aria-controls="collapseExample">{item.title}</dt>
                    <dd className="accordion-collapse collapse" id={item.id}>
                      <p>{item.text}</p>
                    </dd>
                  </>
                ))}
                
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Faq);
