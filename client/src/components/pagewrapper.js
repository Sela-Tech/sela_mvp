import React, {Component} from 'react';

export default function PageWrapper(props) {
	return <div id="page-content-wrapper" style={{ backgroundColor: '#fafafa', paddingBottom: 100 }}>
		{props.children}
	</div>
};