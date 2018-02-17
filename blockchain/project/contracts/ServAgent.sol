pragma solidity ^0.4.0;

import "Project.sol";


// Contract for project execution
contract ServAgentContract {
    // TODO: Applications are to be displayed on a project dashboard
    // that is visible to the creator (Funding Agent) of the project
    function submitProjectApplication(address projectAddress) public {}

    // TODO: Send notification to project creator
    function withdrawProjectApplication(address projectAddress) public {}

    // TODO: Send notification to project creator
    function acceptProjectOffer(address projectAddress, uint servStake) public {
        ProjectContract projectContract = ProjectContract(projectAddress);
        projectContract.commitStake(ProjectContract.AgentType.SERV, servStake);
    }
}