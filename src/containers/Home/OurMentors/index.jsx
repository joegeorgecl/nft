import SecHead from "../../../components/SecHead"
import Img from "../../../components/Img"
import { Link } from "react-router-dom";

const OurMentors = ({data}) => {

  const {teamItem=""} = data;

  return (

    <section className="currency section-padding-100-70">
      <div className="container">
        <SecHead
          title="Our Top Categories"
          SubTitleClass="b-text"
          SubTitle="Choose NFTs By Category"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo."
        />
        <div className="row">
          {teamItem?.map((item ,key) => (
            <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12" key={key}>
              
              <Link to={`/category-name/${item.text.split(" ")[0]}`}>
                <div className={`article ${item.class}`}>
                  <Img img={item.img} Class="article__icon" />
                  <h3 className="article__title">{item.text}</h3>                
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurMentors;