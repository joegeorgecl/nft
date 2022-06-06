import {useState , useContext} from "react"
import { formatPrice } from '../../utils';
import Web3Context from '../../store/web3-context';
import MarketplaceContext from '../../store/marketplace-context'

const ClaimFunds = ({img}) => {

  const [fundsLoading, setFundsLoading] = useState(false);
  const web3Ctx = useContext(Web3Context);
  const marketplaceCtx = useContext(MarketplaceContext);

  const claimFundsHandler = (e) => {
    e.preventDefault();
    marketplaceCtx.contract.methods.claimFunds().send({ from: web3Ctx.account })
    .on('transactionHash', (hash) => {
      setFundsLoading(true);
    })
    .on('error', (error) => {
      window.alert('Something went wrong when pushing to the blockchain');
      marketplaceCtx?.setMktIsLoading(false);
    });
  };

  return (
      <div className="team-item hovered d-feature-box active-shape claim-funds">
        <span><img src={img} alt="icon" width="100" className="img-fluid mb-0 mr-2" /></span>
        <div className="item-info">
          <h5 className="gradient-text">Claim Your Funds</h5>
          <p className="text-light">Congrats, You Made A Sale.</p>
          {marketplaceCtx.userFunds > 0 && !fundsLoading && (
            <a href="/#" onClick={(e) => claimFundsHandler(e)} className="readon white-btn hover-shape VIEW_Projects_Btn mt-15">
              <span className="btn btn-warning gradient-text">{`CLAIM ${formatPrice(marketplaceCtx.userFunds)} ETH`}</span>
            </a>
          )}
        </div>
      </div>

  );
}

export default ClaimFunds;