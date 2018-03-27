pragma solidity ^0.4.0;

import "./Project.sol";


// Contract for project execution
contract FundAgent {
    event ProjectCreated(address projectID, address provider, uint budget, uint start, uint end);
    address private owner;

    function FundAgent() public {
        owner = msg.sender;
    }

    // Create and publish a project
    // IMPORTANT: quote is an estimate for one's compensation if all agents
    // involved with project operate with good intent and deliver good outcome
    function createProject(uint capital, uint start, uint end, uint quote, uint fundStake)
    public /*returns (address projectAddress)*/ {
        Project projectContract = new Project(capital, start, end);
        projectContract.commitStake(Project.AgentType.FUND, fundStake);
        address projectAddress = address(projectContract);
        ProjectCreated(projectAddress, owner, capital, start, end);
    }

    // Select and notify applicant of project offer
    /*function grantProjectOffer(address projectAddress, address applicant) public {
    }*/

    // TODO: define the following functions
    /*
    function checkProjectStatus(address projectAddress) public returns (bool complete, bool success) {}
    function deferProjectStart(uint newStart) public {}
    function deferProjectEnd(uint newEnd) public {}
    */

}
