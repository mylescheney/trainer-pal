export const clientSearch = (clients, input) => {
    const fullNameResults = clients.filter(client => {
        const nameSubStr = client.clientName.substring(0, input.length);
        return nameSubStr.toLowerCase() === input.toLowerCase();
    });

    const phoneResults = clients.filter(client => {
        const phoneSubStr = client.clientPhoneNum.substring(0, input.length);
        return phoneSubStr === input;
    });

    const emailResults = clients.filter(client => {
        const emailSubStr = client.clientEmail.substring(0, input.length);
        return emailSubStr.toLowerCase() === input.toLowerCase();
    });

    const lastNameResults = clients.filter(client => {
        const lastName = client.clientName.split(' ')[client.clientName.split(' ').length - 1];
        const lastNameSubStr = lastName.substring(0, input.length);
        return lastNameSubStr.toLowerCase() === input.toLowerCase();
    });

    const allResults = fullNameResults;
    for (let i = 0; i < phoneResults.length; i++) {
        if (allResults.indexOf(phoneResults[i]) === -1) {
            allResults.push(phoneResults[i]);
        }
    }
    for (let i = 0; i < emailResults.length; i++) {
        if (allResults.indexOf(emailResults[i]) === -1) {
            allResults.push(emailResults[i]);
        }
    }
    for (let i = 0; i < lastNameResults.length; i++) {
        if (allResults.indexOf(lastNameResults[i]) === -1) {
            allResults.push(lastNameResults[i]);
        }
    }
    
    // Reorganizes final results alphabetically
    allResults.sort((a, b) => a.clientName.split(' ')[a.clientName.split(' ').length - 1].localeCompare(b.clientName.split(' ')[b.clientName.split(' ').length - 1]));

    return allResults;
}