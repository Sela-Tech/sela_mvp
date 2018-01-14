pragma solidity ^0.4.0;


// Contract for project execution
contract ProjectContract {
    enum AgentType {FUND, SERV, EVAL}

    struct Project {
        address owner;
        address serviceAgent;
        address[] evaluationAgents;
        uint allocation;
        uint fundingStake;
        uint serviceStake;
        uint evaluationStake;
        uint numEvaluationAgents;
        uint startDate;
        uint endDate;
        bool complete;
        bool success;
        mapping (string => uint) location; // Has keys "lat" and "long"
        mapping (bool => uint) reports;
    }

    Project project;

    uint public constant BLOCKS_PER_SEC = 4; // TODO: Might be API for this via Oraclize, etc.

    address private owner;

    function ProjectContract(uint capital, uint fStake, uint sStake, uint eStake, uint start, uint end)
    public {
        owner = msg.sender;
        project = newProject(capital, fStake, sStake, eStake, start, end);
    }

    modifier ifOwner() {
        if (msg.sender == owner) {
            _;
        }
        revert();
    }

    modifier ifServ() {
        if (address(this) == project.serviceAgent) {
            _;
        }
        revert();
    }

    modifier ifEval() {
        for (uint i = 0; i < project.numEvaluationAgents; i++) {
            if (address(this) == project.evaluationAgents[i]) {
                _;
            }
        }
        revert();
    }

    modifier ifAfford(uint amount) {
        if (msg.value >= amount) {
            _;
        }
        revert();
    }

    function registerServiceAgent (address sAgent) public ifOwner {
        // TODO: Might help to track this with an event
        project.serviceAgent = sAgent;
    }

    function registerEvaluationAgent(address eAgent) public ifOwner {
        // TODO: Might help to track this with an event
        project.evaluationAgents[project.numEvaluationAgents] = eAgent;
        project.numEvaluationAgents++;
    }

    function registerLocation(uint lat, uint long) public ifOwner {
        project.location["lat"] = lat;
        project.location["long"] = long;
    }

    // Funding Agent and Service Agent commit stake to project execution
    function commitStake(AgentType agentType, uint stake) public ifAfford(stake) {
      // TODO: Might help to track this with an event
        if (agentType == AgentType.FUND) {
            project.fundingStake += stake;
        } else if (agentType == AgentType.SERV) {
            project.serviceStake += stake;
        } else if (agentType == AgentType.EVAL) {
            project.evaluationStake += stake;
        }
    }

    // Defualt on project
    function defaultProject() public {
        // TODO: Might help to track this with an event
        project.complete = true;
        project.success = false;
    }

    // Defer project to later date
    function deferProjectDeadline(uint newEndDate) public ifOwner {
        // TODO: Might help to track this with an event
        project.endDate = newEndDate;
    }

    function submitReport(bool report) public ifEval {
        // TODO: Might help to track this with an event
        project.reports[report]++;
    }

    function evaluateProject() public returns(bool) {
        // TODO: Might help to track this with an event
        uint numSuccessful = project.reports[true];
        uint numUnsuccessful = project.reports[false];
        uint numEvaluationAgents = project.numEvaluationAgents;
        if (isProjectComplete(numSuccessful, numUnsuccessful, numEvaluationAgents)) {
            if (isProjectSuccessful(numSuccessful, numUnsuccessful)) {
                // TODO: reward service agent and correct evaluation agents
                // and punish incorrect evaluation agents
                project.success = true;
            } else {
                // TODO: reward correct evaluation agents
                // and punish service agent and incorrect evaluation agents
                project.success = false;
            }
            project.complete = true;
        }
    }

    function payout() public {
        // TODO: Pay service agent and/or correct evaluation agents
        // TODO: Might help to track this with an event
    }

    function isProjectComplete(uint numSuccessful, uint numUnsuccessful, uint numEvaluationAgents)
    private pure returns (bool comp) {
        return numSuccessful + numUnsuccessful == numEvaluationAgents;
    }

    function isProjectSuccessful(uint numSuccessful, uint numUnsuccessful)
    private pure returns (bool comp) {
        return numSuccessful > numUnsuccessful;
    }

    // Initialize project
    function newProject(uint capital, uint fStake, uint sStake, uint eStake, uint start, uint end)
    private constant ifOwner ifAfford(capital) returns(Project proj) {
        proj.owner = msg.sender;
        proj.allocation = capital;
        proj.fundingStake = fStake;
        proj.serviceStake = sStake;
        proj.evaluationStake = eStake;
        proj.numEvaluationAgents = 0;
        proj.startDate = start;
        proj.endDate = end;
        proj.complete = false;
        proj.success = false;
    }
}
