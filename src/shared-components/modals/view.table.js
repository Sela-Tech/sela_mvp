import TableWrap from '../../pages/dashboards/shared/styling/table';
import React,{ Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

class MiniExcelTable extends Component{
render(){
    const {submissions, fields} = this.props;
    let width = 100 / fields.length;

    return <TableWrap className='xs-12'>

        <div className='headings xs-12'>
            {fields.map((column,index)=>{
                return <div style={{width: `${width}%`, float: 'left'}} key={index}>
                    <h3>{column.title}</h3>
                </div>
            })}
        </div>

        <div className='content xs-12'>
            {submissions.map((sub,i)=>{
                return <div className='xs-12 row' key={i}>
                        {Object.keys(sub).filter(column=>{
                            return column !== "user"
                        }).map(( column, index )=>{
                        return <div className='col-row' style={{ width: `${width}%`, float: "left" }} key={index}> 
                            <p>{ column.trim().toLowerCase() === 'date' ?
                             moment(sub[column]).format("DD MMMM YYYY") : sub[column] }</p>
                        </div>
                        })}
                </div>
            })}
        </div>  
    </TableWrap>
}
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(MiniExcelTable);