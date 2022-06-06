import Img from "../../../components/Img"
import SecHead from "../../../components/SecHead"

const HowItWorks = ({data}) => {

  const {HowItWorksContents} = data;

  return (
    <section className="features section-padding-100-70">
      
      <SecHead
        title="How it Works"
        SubTitleClass="text-dark"
        textClass="text-secondary"
        SubTitle="How it Works"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo."
      />

      <div className="container">
        <div className="row">

          {HowItWorksContents.map((item , key) => (
            <div className="col-12 col-sm-6 col-lg-3" key={key}>
              {/* Content */}
              <div className="service_single_content text-center">
                {/* Icon */}
                <div className={`service_icon ${item.class}`}>
                  <Img img={item.img} />
                </div>
                <h6>{item.title}</h6>
                <p className="text-secondary">{item.text}</p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;