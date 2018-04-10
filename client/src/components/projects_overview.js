import React, { Component } from 'react';
import { TopHeader } from './appbar';
import PageWrapper from './pagewrapper';
import Page from '../pagedraw/projectsoverview';

export default class ProjectsOverview extends Component {

    getStatusPie() {
        return {
            data: [8, 4, 3],
            colors: ['#689F38', '#FFC107', '#2E7D32']
        }
    }

    render() {
        return <PageWrapper>
            <TopHeader 
                title="Projects overview"
                description=""
                icon="pie_chart" />
            <Page statusPie={this.getStatusPie()} />
        </PageWrapper>
    }
}