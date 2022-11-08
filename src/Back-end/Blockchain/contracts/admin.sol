// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import "./../node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./products.sol";
import "./location.sol";

contract Admin is ERC721Holder {
    // State variables

    address public owner;

    Products private productsInstance;

    mapping(address => string) public locationName;
    mapping(string => address) public locationId;

    address[] private allLocationsIds;
    string[] private allLocationsName;

    // Modifiers

    modifier isOwner() {
        require(owner == msg.sender, "Not owner");
        _;
    }

    constructor(address _productsContractAddress) {
        owner = msg.sender;
        productsInstance = Products(_productsContractAddress);
    }

    // Methods for the NFT's

    function objectLocation(uint256 _objectId) public view returns (address) {
        address location = productsInstance.ownerOf(_objectId);
        return location;
    }

    function getAllLocationsIds()
        public
        view
        isOwner
        returns (address[] memory)
    {
        return allLocationsIds;
    }

    function getAllLocationsName()
        public
        view
        isOwner
        returns (string[] memory)
    {
        return allLocationsName;
    }

    function addLocation(string memory _name, string memory _locationId)
        public
        isOwner
        returns (bool)
    {
        address newLocation = address(new Location(_locationId));

        allLocationsIds.push(newLocation);
        locationName[newLocation] = _name;

        allLocationsName.push(_name);
        locationId[_name] = newLocation;

        return true;
    }
}
