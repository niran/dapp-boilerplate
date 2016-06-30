/**
 * Records current monthly commitments for commonwealths identified by the
 * address of their identity contracts.
 */
contract Pledges {
  // Map commonwealths to volunteers to pledge amounts.
  mapping (address => mapping (address => uint)) public pledges;

  // Append-only lists of volunteers to fund each commonwealth.
  mapping (address => address[]) public volunteers;

  event SetPledge(
    address indexed commonwealth,
    address indexed volunteer,
    uint amount
  );

  function setPledge(address commonwealth, uint amount) {
    if (pledges[commonwealth][msg.sender] == 0) {
      volunteers[commonwealth].push(msg.sender);
    }

    pledges[commonwealth][msg.sender] = amount;
    SetPledge(commonwealth, msg.sender, amount);
  }

  /**
   * Get the length of the volunteers array.
   *
   * NOTE: This is not the number of volunteers. Volunteers aren't removed
   * from the array when they set their pledge to zero, and they can appear
   * multiple times.
   */
  function getVolunteersLength(address commonwealth) returns (uint) {
    return volunteers[commonwealth].length;
  }

  /**
   * Get up to 32 pairs of volunteers and their pledge amounts.
   */
  function getVolunteers(address commonwealth, uint startIndex) returns (uint[64]) {
    uint volunteersLength = volunteers[commonwealth].length;
    uint retrievalLimit = startIndex + 32;
    uint[64] memory volunteerPledges;
    for (uint i = startIndex; i < volunteersLength && i < retrievalLimit; i++) {
      address volunteer = volunteers[commonwealth][i];
      volunteerPledges[(i - startIndex) * 2] = uint(volunteer);
      volunteerPledges[(i - startIndex) * 2 + 1] = pledges[commonwealth][volunteer];
    }
    return volunteerPledges;
  }
}
