// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/Counters.sol";
contract Registry {
    address payable public owner;
     using Counters for Counters.Counter;
  Counters.Counter private _custIds;
  Counters.Counter private _ServiceProviderIds;
    
    constructor()
    {
        owner=payable(msg.sender);
    }

     modifier onlyOwner {
        require(msg.sender == owner);
        _; 
     }

   event cusIdResult(uint _custID, string _name);

   event serviceProviderIdResult(uint _srPID, string _name);
    struct customerMembership {
        uint custID;
        address payable id;
        string name;
        string location;

    }

    
    struct serviceProvider {
        uint256 _ServiceProviderId;
        address payable id;
        string name;
        string serviceCategory;
        string location;
    }
    
    // Produce struct
    struct serviceRating {
       uint256 identityNo;
               uint  rating;
               uint256 customerCount;
              
        
    }
    
    mapping(uint => customerMembership) public Customers;
    
    mapping(uint => serviceProvider) public serviceProviders;
    mapping(uint256 =>serviceRating) public Rating;
    
    function addCustomer(address payable _id, string memory _name, string memory _location)  public  
    {
       _custIds.increment();
    uint256 custID = _custIds.current();
      customerMembership memory new_member = customerMembership(custID, _id,_name,_location);
      Customers[custID] = new_member;
   
   emit cusIdResult(custID, _name);
    }
    
    function addServiceProvider( address  payable _id, string memory _name, string memory _serviceCategory, string memory _location)  public onlyOwner 
    {
        _ServiceProviderIds.increment();

       uint serviceProviderId=_ServiceProviderIds.current();

        serviceProvider memory new_member = serviceProvider(serviceProviderId, _id,_name,_serviceCategory,_location);
       serviceProviders[serviceProviderId] = new_member;
      emit serviceProviderIdResult(serviceProviderId,_name);
    }

    function addServiceRating(uint _identityNo, uint256 _rating) public {
        uint count=Rating[_identityNo].customerCount;
        count=count+1;
        serviceRating memory new_rating = serviceRating(_identityNo,_rating,  count);
        Rating[_identityNo] = new_rating;
       
        }
        function viewRating(uint _identityNo) public view returns(serviceRating memory) {
            return Rating[_identityNo];
        }
    
//    function viewServiceProvider(uint _identityNo) public view returns(serviceProvider memory) {
//             return serviceProviders[_identityNo];
//         }
        function viewSUser(uint _id) public view returns(customerMembership memory) {
            return Customers[_id];
        }
}