pragma solidity ^0.4.0;


// Contract for project execution
contract Project {
    enum AgentType {FUND, SERV, EVAL}

    struct Proj {
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
        mapping (address => uint) rewards;
    }

    Proj private project;

    uint public constant MIN_STAKE = 1; // TODO: Might retrieve this from external source

    address private owner;

    function Project(uint cap, uint start, uint end) public {
        owner = msg.sender;
        project = newProject(cap, start, end);
    }

    // Fallback function
    function() public payable {}

    /*modifier ifOwner() {
        if (msg.sender != owner) {
            revert();
        }
        _;
    }

    modifier ifServ() {
        bool isServ = false;
        for (uint i = 0; i < project.numServAgents; i++) {
            if (address(this) == project.servAgents[i]) {
                isServ = true;
                break;
            }
        }
        if (!isServ) {
            revert();
        }
        _;
    }

    modifier ifEval() {
        bool isEval = false;
        for (uint i = 0; i < project.numEvalAgents; i++) {
            if (address(this) == project.evalAgents[i]) {
                isEval = true;
                break;
            }
        }
        if (!isEval) {
            revert();
        }
        _;
    }

    modifier ifAfford(uint amount) {
        if (msg.value < amount) {
            revert();
        }
        _;
    }*/

    function registerServiceAgent (address sAgent) public /*ifOwner*/ {
        // TODO: Might help to track this with an event
        project.servAgents.push(sAgent);
        project.numServAgents++;
    }

    function registerEvaluationAgent(address eAgent) public /*ifOwner*/ {
        // TODO: Might help to track this with an event
        project.evalAgents.push(eAgent);
        project.numEvalAgents++;
    }

    // Agents commit stake to project execution
    function commitStake(AgentType agentType, uint stake) public payable /*ifAfford(stake)*/ {
        // TODO: Might help to track this with an event
        /* require(stake >= MIN_STAKE); */
        if (agentType == AgentType.FUND) {
            project.fundStake += stake;
            /* this.transfer(stake); */
        } else if (agentType == AgentType.SERV) {
            project.servStake += stake;
            /* this.transfer(stake); */
        } else if (agentType == AgentType.EVAL) {
            project.evalStake += stake;
            /* this.transfer(stake); */
        }
    }

    // Defualt on project
    function defaultProject() public {
        // TODO: Might help to track this with an event
        project.complete = true;
        project.success = false;
    }

    // Defer project end date to later date
    function deferProjectStart(uint newStart) public /*ifOwner*/ {
        // TODO: Might help to track this with an event
        /* require(now <= newStart);
        require(project.start <= newStart); */
        project.start = newStart;
    }

    // Defer project end date to later date
    function deferProjectEnd(uint newEnd) public /*ifOwner*/ {
        // TODO: Might help to track this with an event
        project.end = newEnd;
    }

    function submitReport(bool report) public /*ifEval*/ {
        // TODO: Might help to track this with an event
        uint numEvalAgents = project.numEvalAgents;
        uint numPosReports = project.reports[true].length;
        uint numNegReports = project.reports[false].length;
        if (numPosReports + numNegReports == numEvalAgents) {
            // TODO: Consider using event to send message to eval agent
            return;
        }
        project.reports[report].push(msg.sender);
        evaluateProject();
    }

    function evaluateProject() public {
        // TODO: Might help to track this with an event
        uint numEvalAgents = project.numEvalAgents;
        uint numPosReports = project.reports[true].length;
        uint numNegReports = project.reports[false].length;
        // Check for complete project
        if (numPosReports + numNegReports != numEvalAgents) {
            return;
        }
        address evalAgent;
        address servAgent;
        project.complete = true;
        uint numServAgents = project.numServAgents;
        // Check for successful project
        if (numPosReports > numNegReports) {
            // TODO: reward service agents and correct evaluation agents
            // and punish incorrect evaluation agents
            project.success = true;
            // TODO: make more precise else money will be lost
            uint posReward = project.capital / (numPosReports + numServAgents);
            for (uint i = 0; i < numPosReports; i++) {
                evalAgent = project.reports[true][i];
                project.rewards[evalAgent] = posReward;
            }
            for (i = 0; i < numServAgents; i++) {
                servAgent = project.servAgents[i];
                project.rewards[servAgent] = posReward;
            }
        } else {
            // TODO: reward correct evaluation agents
            // and punish service agent and incorrect evaluation agents
            project.success = false;
            // TODO: make more precise else money will be lost
            uint negReward = project.capital / numNegReports;
            for (uint j = 0; j < numNegReports; j++) {
                evalAgent = project.reports[false][j];
                project.rewards[evalAgent] = negReward;
            }
        }
    }

    function claimReward() public {
        // TODO: Pay service agent and/or correct evaluation agents
        // TODO: Might help to track this with an event
        uint reward = project.rewards[msg.sender];
        project.rewards[msg.sender] = 0;
        msg.sender.transfer(reward);
    }

    // Initialize project
    // IMPORTANT: use owner and not msg.sender because msg.sender is this, since newProject is a private method
    function newProject(uint cap, uint start, uint end)
    private constant returns(Proj proj) {
        proj.owner = owner;
        proj.capital = cap;
        proj.start = start;
        proj.end = end;
        proj.complete = false;
        proj.success = false;
    }
}
