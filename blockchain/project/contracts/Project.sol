pragma solidity ^0.4.0;


// Contract for project execution
contract ProjectExecutionContract {
    enum StakeType {FUND, SERV}
    uint private fundingStake;
    uint private serviceStake;
    uint private startDate;
    uint private endDate;
    address owner;

    function ProjectExecutionContract() public {
        owner = msg.sender;
    }

    modifier ifOwner() {
        if (msg.sender == owner) {
            _;
        }
    }

    modifier ifAfford(uint stake) {
        if (msg.value >= stake) {
            _;
        }
    }

    function commitStake(StakeType stakeType, uint stake) public ifAfford(stake) {
        if (stakeType == StakeType.FUND) {
            fundingStake += stake;
        } else if (stakeType == StakeType.SERV) {
            serviceStake += stake;
        }
    }

    /*function defaultProject() public {

    }

    function deferProject() public {

    }*/
}


// Contract for project evaluation
contract ProjectEvaluationContract {
    enum StakeType {SERV, EVAL}
    uint private serviceStake;
    uint private evaluationStake;
    address owner;

    function ProjectEvaluationContract() public {
        owner = msg.sender;
    }

    modifier ifOwner() {
        if (owner == msg.sender) {
            _;
        }
    }

    modifier ifAfford(uint stake) {
        if (msg.value >= stake) {
            _;
        }
    }

    function commitStake(StakeType stakeType, uint stake) public ifAfford(stake) {
        if (stakeType == StakeType.SERV) {
            serviceStake += stake;
        } else if (stakeType == StakeType.EVAL) {
            evaluationStake += stake;
        }
    }
}
