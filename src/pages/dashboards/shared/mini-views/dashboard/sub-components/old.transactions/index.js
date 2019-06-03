import React from "react";
import connect from "react-redux/lib/connect/connect";
import TWrap from "./transactions.style";
import { showModal } from "../../../../../../../store/action-creators/modal";
import { SHOW_ADD_TRANSACTION_MODAL } from "../../../../../../../store/actions/modal";
import TableWrap from "../../../../styling/table";
import { Link } from "react-router-dom";

class Transactions extends React.Component {
  state = { date: "", transactions:[] };

  showAddTransactionModal = () => this.props.dispatch(
    showModal( SHOW_ADD_TRANSACTION_MODAL, { projectId: this.props.projectId }));

  render() {
    const { transactions } = this.state;
  
    return (
      <TWrap className="xs-12">
        <TableWrap className='xs-12'>
          <div className='top xs-12'>  
            <div className='f-l'>
              <h3>Transactions</h3>
            </div>
            <div className='f-r'>
              { this.props.homePageDeep !== true && this.props.readOnly !== true &&
                <button className="button" onClick={this.showAddTransactionModal}>
                  Add Transaction
                </button>
               }
              </div>
          </div>

          <div className='headings xs-12'>
            <div className='xs-3'>
                <h3>From</h3>
            </div>
            <div className='xs-2'>
                <h3>Date</h3>
            </div>
            <div className='xs-2'>
                <h3>Amount</h3>
            </div>
            <div className='xs-2'>
                <h3>Type</h3>
            </div>
            <div className='xs-3'>
                <h3>Proof</h3>
            </div>
            
          </div>


          <div className='content xs-12'>
                { Boolean(transactions.length) ?
                    transactions.map((p,index)=>{
                        return <div className='row xs-12' key={index}>
                        <div className='xs-3 col-row'>
                            <Link to={`/dashboard/milestone/${p._id}`}>{""}</Link>
                        </div>
                        <div className='xs-3 col-row'>
                            <button onClick={()=>this.showSH(3102)}><img src="http://placehold.it/50" alt=""/>{""} </button>
                        </div>
                        
                        <div className='xs-3 col-row'>
                            <p>{window.moneyFormat(3000, '$')} </p>
                        </div>
                    </div>
                    })
                : <div className='row xs-12'>
                    <p style={{
                        padding: '1em'
                    }}>No Transactions Found.</p>
                </div>
            }
          </div>
        </TableWrap>
      </TWrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectId: state.projects.single.info._id,
    transactions: state.projects.single.info.transactions,
    transactionsForHomePage: state.home.project.transactions,
    type: state.transactions.type
  };
};

export default connect(mapStateToProps)(Transactions);
