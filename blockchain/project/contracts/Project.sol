pragma solidity ^0.4.0;


// Contract for project execution
contract ProjectContract {
    enum AgentType {FUND, SERV, EVAL}

    struct Project {
        address owner; // Funding agent
        address[] servAgents; // Service agents
        address[] evalAgents; // Evaluation agents
        uint capital; // Capital allocation
        uint fundStake; // Funding agent stake (assuming initially 0)
        uint servStake; // Service agent stake (assuming initially 0)
        uint evalStake; // Evaluation agent stake (assuming initially 0)
        uint numServAgents; // Number of service agents (assuming initially 0)
        uint numEvalAgents; // Number of evaluation agents (assuming initially 0)
        uint start; // Start date
        uint end; // End date
        bool complete; // Completion status
        bool success; // Success status
        mapping (bool => address[]) reports; // Positive and negative reports
    }

    Project private project;

    uint public constant MIN_STAKE = 1; // TODO: Might retrieve this from external source

    address private owner;

    function ProjectContract(uint capital, uint start, uint end)
    public {
        require(now <= start);
        require(start < end);
        owner = msg.sender;
        project = newProject(capital, start, end);
    }

    // Fallback function
    function() public payable {}

    modifier ifOwner() {
        if (msg.sender == owner) {
            _;
        }
        revert();
    }

    modifier ifServ() {
        for (uint i = 0; i < project.numServAgents; i++) {
            if (address(this) == project.servAgents[i]) {
                _;
            }
        }
        revert();
    }

    modifier ifEval() {
        for (uint i = 0; i < project.numEvalAgents; i++) {
            if (address(this) == project.evalAgents[i]) {
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
        project.servAgents.push(sAgent);
        project.numServAgents++;
    }

    function registerEvaluationAgent(address eAgent) public ifOwner {
        // TODO: Might help to track this with an event
        project.evalAgents.push(eAgent);
        project.numEvalAgents++;
    }

    // Funding Agent and Service Agent commit stake to project execution
    function commitStake(AgentType agentType, uint stake) public payable ifAfford(stake) {
      // TODO: Might help to track this with an event
        require(stake >= MIN_STAKE);
        if (agentType == AgentType.FUND) {
            project.fundStake += stake;
            this.transfer(stake);
        } else if (agentType == AgentType.SERV) {
            project.servStake += stake;
            this.transfer(stake);
        } else if (agentType == AgentType.EVAL) {
            project.evalStake += stake;
            this.transfer(stake);
        }
    }

    // Defualt on project
    function defaultProject() public {
        // TODO: Might help to track this with an event
        project.complete = true;
        project.success = false;
    }

    // Defer project end date to later date
    function deferProjectStart(uint newStart) public ifOwner {
        // TODO: Might help to track this with an event
        project.start = newStart;
    }

    // Defer project end date to later date
    function deferProjectEnd(uint newEnd) public ifOwner {
        // TODO: Might help to track this with an event
        project.end = newEnd;
    }

    function submitReport(bool report) public ifEval {
        // TODO: Might help to track this with an event
        project.reports[report].push(msg.sender);
        this.evaluateProject();
    }

    function evaluateProject() public returns(bool) {
        // TODO: Might help to track this with an event
        uint numPosReports = project.reports[true].length;
        uint numNegReports = project.reports[false].length;
        uint numEvalAgents = project.numEvalAgents;
        // Check for complete project
        if (numPosReports + numNegReports == numEvalAgents) {
            project.complete = true;
            this.payout(numPosReports, numNegReports);
        }
    }

    function payout(uint numPosReports, uint numNegReports) public {
        // TODO: Pay service agent and/or correct evaluation agents
        // TODO: Might help to track this with an event
        uint numServAgents = project.numServAgents;
        // Check for successful project
        if (numPosReports > numNegReports) {
            // TODO: reward service agents and correct evaluation agents
            // and punish incorrect evaluation agents
            project.success = true;
            // TODO: make more precise else money will be lost
            uint posReward = project.capital / (numPosReports + numServAgents);
            for (uint i = 0; i < numPosReports; i++) {
                project.reports[true][i].transfer(posReward);
            }
            for (i = 0; i < numServAgents; i++) {
                project.servAgents[i].transfer(posReward);
            }
        } else {
            // TODO: reward correct evaluation agents
            // and punish service agent and incorrect evaluation agents
            project.success = false;
            // TODO: make more precise else money will be lost
            uint negReward = project.capital / numNegReports;
            for (uint j = 0; j < numNegReports; j++) {
                project.reports[false][j].transfer(negReward);
            }
        }
    }

    // Initialize project
    // IMPORTANT: use owner and not msg.sender because msg.sender is this, since newProject is a private method
    function newProject(uint cap, uint start, uint end)
    private constant ifOwner ifAfford(cap) returns(Project proj) {
        proj.owner = owner;
        proj.capital = cap;
        proj.start = start;
        proj.end = end;
        proj.complete = false;
        proj.success = false;
    }
}
