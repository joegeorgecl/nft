const HowItWorks = ({ title , data }) => {
  const {How__header , How__headerHighlight} = title;
  return (
      <section className="How_it_works">
        <div className="container">
          <div className="How__header">
            <h2>{How__header} <span className="highlight">{How__headerHighlight}</span></h2>
          </div>
          <div className="row">
            {data && data.map((item , key) => (
              <div className="col-12 col-lg-6" key={key}>
                <div className="how-item">
                  <div className="icon-wrap">
                    <img loading="lazy" data-src={item.img} alt="Artista Mayk" className="artist__avatar" />
                  </div>
                  <div className="artist__infos">
                    <p className="artist__name">{item.artist__name}</p>
                    <p className="artist__photosNumber">{item.artist__photosNumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

export default HowItWorks;