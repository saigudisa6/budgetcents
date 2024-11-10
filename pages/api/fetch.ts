export async function saveMemberData(memberData: {
    name: string;
    memberType: 'Pledge' | 'Brother';
    pledgeClass: string;
    userId: string;
  }) {
    return fetch('http://localhost:5000/createMember', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData)
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

export async function getMemberData(userId: string | undefined){
    return fetch(`http://localhost:5000/getMemberData?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        });
}

export async function getCommitteeBudgets(){
    return fetch('http://localhost:5000/get_committee_budgets')
        .then((response) => response.json())
        .then((data) => {
            return data
        });
}

export async function changeStatus(data: {
    userId: string | undefined;
    status: 'ACTIVE' | 'LOA' | 'PART-TIME';
}) {
    return fetch('http://localhost:5000/updateStatus', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  export async function addCommittee(committeeData: {
    name: string; budget: number | null; activities: { name: string; cost: number }[]
  }){
    return fetch('http://localhost:5000/add_committee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(committeeData),
      })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
  }

  export async function acceptBudgetReqest(budgetData:{name: string, amount: number}){
    return fetch('http://localhost:5000/approveBudget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
      })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
  }
  