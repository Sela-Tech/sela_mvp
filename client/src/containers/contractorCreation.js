import { connect } from 'react-redux';
import { contractorActionTors as creators } from '../ducks';
import ContractorForm from '../components/contractorForm';

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addContractor: (data) => {
            const query = { taskId: ownProps.taskId, ...data };
            dispatch(creators.createRequest(data, ownProps.onContractorSave));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractorForm)
