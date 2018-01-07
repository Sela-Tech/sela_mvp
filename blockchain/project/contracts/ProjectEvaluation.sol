pragma solidity ^0.4.0;


// Contract for funding stake
contract ProjectEvaluationContract {
    enum StakeType {SERV, EVAL}
    uint private serviceStake;
    uint private evaluationStake;
    address owner;

    function ProjectEvaluationContract() public {
        owner = msg.sender;
    }

    modifier ifOwner() {
        /*if (owner != msg.sender) {
            revert();
        }
        _;*/
        require(owner == msg.sender);
        _;
    }

    function commitStake(StakeType stakeType, uint stake) public {
        if (stakeType == StakeType.SERV) {
            serviceStake += stake;
        } else if (stakeType == StakeType.EVAL) {
            evaluationStake += stake;
        }
    }
}
