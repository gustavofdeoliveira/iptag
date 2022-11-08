// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import "./../node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Location is ERC721Holder {
    // state variables

    address private owner;

    string public location;

    // Modifiers

    modifier isOwner() {
        require(owner == msg.sender, "Not owner");
        _;
    }

    // Methods

    constructor(string memory _id) {
        owner = msg.sender;
        location = _id;
    }

    function changeLocationId(string memory _newId)
        public
        isOwner
        returns (bool)
    {
        require(
            keccak256(abi.encodePacked((_newId))) ==
                keccak256(abi.encodePacked((location))),
            "Trying to change for the same id"
        );
        location = _newId;
        return true;
    }
}
