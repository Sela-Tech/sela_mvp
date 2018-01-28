pragma solidity ^0.4.0;

import "Project.sol";


// Contract for project execution
contract FundAgentContract {
    event ProjectCreated(address provider, uint quote, uint start, uint end);
    address private owner;

    function FundAgentContract() public {
        owner = msg.sender;
    }

    // Create and publish a project
    // IMPORTANT: quote is an estimate for one's compensation if all agents
    // involved with project operate with good intent and deliver good outcome
    function createProject(uint capital, uint start, uint end, uint quote, uint fundStake)
    public returns (address projectAddress) {
        ProjectContract projectContract = new ProjectContract(capital, start, end);
        projectContract.commitStake(ProjectContract.AgentType.FUND, fundStake);
        projectAddress = address(projectContract);
        ProjectCreated(owner, quote, start, end); // TODO: listen for event in javascript and handle appropriately
    }

    // Select and notify applicant of project offer
    function grantProjectOffer(address projectAddress, address applicant) public {
    }

    // TODO: define the following functions
    /*
    function checkProjectStatus(address projectAddress) public returns (bool complete, bool success) {}
    function deferProjectStart(uint newStart) public {}
    function deferProjectEnd(uint newEnd) public {}
    */

}
