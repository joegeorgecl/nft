import React from "react"


function PreloaderMintItem(){

	return(
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
			<div className="timeline-item">
			<div className="animated-background v2" />
			<div className="background-masker content-first-end" />
			<div className="background-masker content-user" />
			<div className="timeline-item">
				<div className="animated-background">
				<div className="background-masker header-top" />
				<div className="background-masker header-left" />
				<div className="background-masker header-right" />
				<div className="background-masker header-bottom" />
				<div className="background-masker subheader-left" />
				<div className="background-masker subheader-right" />
				<div className="background-masker subheader-bottom" />
				<div className="background-masker content-top" />
				<div className="background-masker content-first-end" />
				<div className="background-masker content-second-line" />
				<div className="background-masker content-second-end" />
				<div className="background-masker content-third-line" />
				<div className="background-masker content-third-end" />
				</div>
			</div>
			</div>
		</div>
	)
}

export default React.memo(PreloaderMintItem)