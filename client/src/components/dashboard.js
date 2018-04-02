import React, { Component } from 'react';
import { TopHeader } from './appbar';
import PageWrapper from './pagewrapper';
import Page from '../pagedraw/dashboard';

const disputes = [
    {projectName: 'K-dere 2', dateSince: '3w ago'},
    {projectName: 'K-dere 2', dateSince: '1mo ago'},
];

export default class Dashboard extends Component {
	render(){
		return <PageWrapper>
			<TopHeader {...this.props.header} />
            <Page disputes={disputes} onSchedule={6} delayed={0} completed={2} />
		</PageWrapper>
	}
}

