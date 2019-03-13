import React from "react";
import connect from "react-redux/lib/connect/connect";
import TWrap from "./transactions.style";
// import moment from "moment";
import { showModal } from "../../../../../../../store/action-creators/modal";
// import Chance from "chance";
import { SHOW_ADD_TRANSACTION_MODAL } from "../../../../../../../store/actions/modal";
import TableWrap from "../../../../styling/table";
import { Link } from "react-router-dom";


// let chance = new Chance();
// const types_of_currencies = ["USD", "Ether", "Bitcoin"];
// const type_of_proofs = [];

// type_of_proofs.USD='https://cdn.vertex42.com/ExcelTemplates/Images/simple-receipt-template.png';
// type_of_proofs.Ether=`https://etherscan.io/tx/0xfab0705d0e141e82cd3dc9bdf8f505cd5de6f2d13cf5c821c85aae10c209f6e1`;
// type_of_proofs.Bitcoin = 'https://www.blockchain.com/btc/tx/5136bf70efa3e63ebc97481f3e01a4030ccc99a4110d30e99ca3da26b92e3e2b';

class Transactions extends React.Component {
  state = {
    date: "",
    transactions:[]
    //  Array.from({length: chance.integer({min: 10, max: 200 })}).map(i=>{
    //   return  {
    //     receiver: chance.name(),
    //     value: chance.integer({min: 5000, max: 90000}),
    //     currency: types_of_currencies[chance.integer({ min: 0, max: 2 })],
    //     createdOn: chance.date()
    //   }
    // }) 
  };

  showAddTransactionModal = () => this.props.dispatch(
    showModal( SHOW_ADD_TRANSACTION_MODAL, { projectId: this.props.projectId }));

  // handleDateUpdate = e => this.setState({ date: e.target.value });

  render() {
    const { transactions } = this.state;
  
    return (
      <TWrap className="xs-12">
        <TableWrap className='xs-12'>
          <div className='top xs-12'>  
            <div className='f-l'>
              <h3>Transactions</h3>
              {/* <span id='info'>Values in the <strong>Name</strong> column can be clicked on</span> */}
            </div>
              <div className='f-r'>
               {this.props.homePageDeep !== true && this.props.readOnly !== true &&
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
                                <Link to={`/dashboard/proposal/${p._id}`}>{""}</Link>
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
        
        {/* <div className="xs-12 sp">
          <div className="f-l c-sm-screen">
            <h3>Transaction History</h3>
          </div>
          {this.props.homePageDeep !== true && (
            <div className="f-r c-sm-screen">
              <select
                className="date"
                name="date"
                value={date}
                onChange={this.handleDateUpdate}
              >
                <option value="30">Last 30 days </option>
                <option value="60">Last 60 days </option>
                <option value="90">Last 90 days </option>
                <option value="120">Last 120 days </option>
                <option value="150">Last 150 days </option>
                <option value="250">Last 250 days </option>
                <option value="365">Last 365 days </option>
              </select>

              <button
                className="blue-btn"
                onClick={this.showAddTransactionModal}
              >
                Add Transaction
              </button>
            </div>
          )}
        </div> */}

        {/* <div className="xs-12 container">
          { transactions && Boolean(transactions.length) ? (
            transactions.map((t, i) => {
              return (
                <div className="xs-12 row b" key={i}>
                   <div className="xs-12 det">
                    <p className='xs-12 sm-6 md-2'>
                      Receiver: <span>{t.receiver}</span>
                    </p>
                    
                    <div className='xs-12 sm-5 md-4'>
                      <p className='xs-12 sm-6'>
                        Amount: <span>{t.value}</span>
                      </p>
                      <p className='xs-12 sm-6'>
                        Currency: <span>{t.currency}</span>
                      </p>
                    </div>
                    
                    <p className='xs-12 sm-6 md-2'>
                      Date Sent: <span>{moment(t.createdOn).format("HH:mm DD MMM YYYY")}</span>
                    </p>
                    <p className='xs-12 sm-6 md-3'>
                      Proof: <span> 
                        <a
                        target="_blank"
                        className="link"
                        href={ type_of_proofs[t.currency] }
                      >
                        View Proof
                      </a>
                      
                     
                      </span>
                    </p>

                  </div>
                
                </div>
              );
            })
          ) : (
            <p>No Records Found.</p>
          )}
        </div>
     */}
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
