import React, {Component} from 'react';
import {TopHeader} from './appbar';
import PageWrapper from './pagewrapper';


export default class Dashboard extends Component {
	render(){
		return <PageWrapper>
			<TopHeader {...this.props.header} />
		</PageWrapper>
	}
}