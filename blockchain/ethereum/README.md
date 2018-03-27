# sela_mvp/blockchain
Instructions for interacting with blockchain on the Sela Platform <br />
Be sure to run these commands from within the sela_mvp/blockchain subdirectory <br />
1) Install Metamask https://metamask.io/<br /> 
2) Run `npm install` <br />
3) Run `testrpc` in a separate terminal
4) Run `npm run clean` <br />
5) Run `npm run deploy` <br />
6) Run `npm run dev` in a separate terminal <br />
7) Click the Metamask icon and select "Private Network"
8) Copy 12-word seed phrase from the testrpc terminal and paste it into the Metamask login
9) Fill out the form (use random positive integer for date, like 2018; use anything for other fields)
10) Respond to Metamask notification by clicking "Submit"
11) Success can be verified in the testrpc terminal with message that has fields for "Transaction", "Contract created", "Gas usage", "Block Number", and "Block Time". Success will also be indicated in the Chrome inspector console.
