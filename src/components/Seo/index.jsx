import React from "react";

import { Helmet } from "react-helmet";

const SEO = ({ title }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="robots" content="noindex, follow" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="description"
                content="Mercado digital para colecionáveis em criptos e tokens não fungível (NFT). 
                Compre, venda e descubra ativos digitais exclusivos para você."
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
        </Helmet>
    );
};

export default React.memo(SEO);
