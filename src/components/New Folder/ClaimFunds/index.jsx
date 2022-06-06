import {useState , useContext} from "react"
import { formatPrice } from '../../utils';
import Web3Context from '../../store/web3-context';
import MarketplaceContext from '../../store/marketplace-context'
import MsgAlert from "../MsgAlert";

const ClaimFunds = ({img}) => {

  const [fundsLoading, setFundsLoading] = useState(false);
  const web3Ctx = useContext(Web3Context);
  const marketplaceCtx = useContext(MarketplaceContext);

  const claimFundsHandler = () => {
    marketplaceCtx.contract.methods.claimFunds().send({ from: web3Ctx.account })
    .on('transactionHash', (hash) => {
      setFundsLoading(true);
    })
    .on('error', (error) => {
      document.getElementById("root").style.position = "relative"
      setTimeout(() => {
        setFundsLoading(false);
      },3000)
      return <MsgAlert />
    });
  };

  return (
      <div className="team-item hovered d-feature-box active-shape claim-funds">
        <span><img src={img} alt="icon" className="img-fluid mb-0" /></span>
        <div className="item-info">
          <h5 className="gradient-text">Claim Your Funds</h5>
          <h4 className="text-light">Congrats, You Made A Sale.</h4>
          {marketplaceCtx.userFunds > 0 && !fundsLoading && (
            <a href="/#" onClick={claimFundsHandler} className="readon white-btn hover-shape VIEW_Projects_Btn mt-15">
              <span className="btn btn-warning gradient-text">{`CLAIM ${formatPrice(marketplaceCtx.userFunds)} ETH`}</span>
            </a>
          )}
        </div>
      </div>

  );
}

export default ClaimFunds;