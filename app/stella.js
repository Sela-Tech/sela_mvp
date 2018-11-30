var StellarSdk = require("stellar-sdk");
var server = new StellarSdk.Server("https://horizon.stellar.org");

// get a list of transactions submitted by a particular account
fetchTransactions = () => {
  server
    .transactions()
    .forAccount("GAD4KBKNWN5IB6SL7IEVU2ZGBHHSY75575XFL6K52RT4MYIQUEZUGDP7")
    .call()

    .then(transactions => {
      return transactions.records.map(t => {
        t.operations().then(o => {
          console.log({
            memo: t.memo,
            hash: t.hash,
            feePaid: t.fee_paid,
            operations: o.records.map(operation => {
              return {
                type: operation.type,
                createdAt: operation.created_at,

                transactionHash: operation.transactionHash,
                from: operation.from,
                to: operation.to,
                amount: operation.amount
              };
            })
          });
        });

        return {
          memo: t.memo,
          createdAt: t.created_at,
          sourceAccount: t.source_account,
          hash: t.hash,
          feePaid: t.fee_paid,
          operations: t.operations()
        };
      });
    })
    .catch(response => {
      return console.log({
        Error: response
      });
    });
};

fetchTransactions();
