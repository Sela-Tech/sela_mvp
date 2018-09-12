import React, {Component} from 'react';

export default function PageWrapper(props) {
	return <div id="page-content-wrapper">
		{props.children}
	</div>
};