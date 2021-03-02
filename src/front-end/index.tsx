import React from "react"
import { render } from "react-dom";
import { DataStore } from './data-store/data-store';
import { GithubStore } from './data-store/github-store';
import { OrganizationPanel } from './organization/organization-panel';

DataStore.registerStoreFactory( ()=> new GithubStore() )

function RepositoryActivityTracker() {
	return (
		<div>
			<OrganizationPanel />
		</div>
	)
}

render(<RepositoryActivityTracker/>, document.getElementsByTagName('RepositoryActivityTracker')[0]);
