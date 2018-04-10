import { connect } from 'react-redux';
import SimpleMap from '../components/maps';
import { projectActionTors as creators } from '../ducks';

const mapStateToProps = (state, ownProps) => {
    console.log(state.projects);
    let markers = Object.values(state.projects.items).map((p, k) => {
        let location = p.location || { lat: 0, lng: 0 };
        return [location.lat, location.lng, k]
    });
    return { markers }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: function () {
            dispatch(creators.fetchRequest())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);

