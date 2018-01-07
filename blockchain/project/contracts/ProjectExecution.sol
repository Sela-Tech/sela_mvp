pragma solidity ^0.4.0;


// Contract for funding stake
contract ProjectExecutionContract {
    enum StakeType {FUND, SERV}
    uint private fundingStake;
    uint private serviceStake;
    address owner;

    function ProjectExecutionContract() public {
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
        if (stakeType == StakeType.FUND) {
            fundingStake += stake;
        } else if (stakeType == StakeType.SERV) {
            serviceStake += stake;
        }
    }
}
