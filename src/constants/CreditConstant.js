export const totalCreditPerDay = 150;
export const UPDATE_CREDIT = 'UPDATE_CREDIT';

export const updateCredit = (headers) => {
    let creditsUsed = 0;
    creditsUsedString = headers.map['x-api-quota-used'];

    if(creditsUsedString == undefined)
    {
        creditsUsed = 0; 
    }
    else
    {
        creditsUsed = parseFloat(creditsUsedString);
    }
    

    let creditRemaining = totalCreditPerDay - creditsUsed;
    creditRemaining = creditRemaining.toFixed(2); 
    let updateDate = headers.map.date;
    
    let data = { creditRemaining: creditRemaining, lastUpdate: updateDate };
    const action = { type: UPDATE_CREDIT, value: data };
    return action;
}