// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import "./../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Products is ERC721 {
    // State variables

    address public owner;

    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256[]) public userTokens;

    // Events

    event objectMovement(uint256 _objectId, address _from, address _to);

    // Modifiers

    modifier isOwner() {
        require(owner == msg.sender, "Not owner");
        _;
    }

    constructor() ERC721("Object", "OBJT") {
        owner = msg.sender;
    }

    // Methods for the NFT's

    function setTokenURI(uint256 _tokenId, string memory _newURI)
        public
        isOwner
        returns (bool)
    {
        _tokenURIs[_tokenId] = _newURI;
        return true;
    }

    function createObject(
        address _location,
        uint256 _id,
        string memory _tokenURI
    ) public isOwner returns (bool) {
        // Checks if that id already exists
        _requireMinted(_id);

        // Creates a new object
        _mint(_location, _id);

        // Sets the URI that contains the metadata of the object
        setTokenURI(_id, _tokenURI);
        return true;
    }

    function deleteObject(uint256 _objectId) public isOwner returns (bool) {
        //Checks if the object exists
        _requireMinted(_objectId);

        // Deletes the object
        _burn(_objectId);

        return true;
    }

    function getUserTokens(address _address)
        public
        view
        returns (uint256[] memory)
    {
        return (userTokens[_address]);
    }

    // Override functions

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        _requireMinted(tokenId);

        string memory baseURI = _tokenURIs[tokenId];
        return baseURI;
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        // Verify if the msg.sender have the allowence to transfer the token
        require(
            ERC721.ownerOf(tokenId) == from || _msgSender() == owner,
            "ERC721: transfer from incorrect owner"
        );
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        ERC721._balances[from] -= 1;
        ERC721._balances[to] += 1;
        ERC721._owners[tokenId] = to;

        emit Transfer(from, to, tokenId);

        _afterTokenTransfer(from, to, tokenId);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        emit objectMovement(tokenId, from, to);
        userTokens[from][tokenId] = userTokens[from][
            userTokens[from].length - 1
        ];
        userTokens[from].pop();
        userTokens[to].push(tokenId);
    }
}
