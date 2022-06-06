import Img from "../../../components/Img"

const HowToParticipateSect = ({data , img}) => {

  const {How_to_Participate_right_Contnet} = data

  return (
      <section className="about-us-area section-padding-0-0">
        <div className="container about-box bg-2 br-50 about-before">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="welcome-meter">
                <Img img={img} Class="center-block" />
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-s">
              <div className="who-we-contant">
                <div className="dream-dots text-left" data-wow-delay="0.2s">
                  <span>Learn more about us</span>
                </div>
                <h4 className="bold text-dark" data-wow-delay="0.3s">Your fastest path to a Discover, Buy and Sell  NFT Assets.</h4>
                <p className="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dictum risus, non suscipit arcu. Quisque aliquam posuere tortor, sit amet convallis nunc scelerisque in.</p>
                <div className="list-wrap align-items-center">
                  <div className="row">

                    {How_to_Participate_right_Contnet?.map((item ,key) => (
                      <div className="col-md-12" key={key}>
                        <div className="side-feature-list-item">
                          <Img img={item.img} Class="check-mark-icon" />
                          <div className="foot-c-info">{item.title}</div>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default HowToParticipateSect;