Playground
==========

This project is a boilerplate for the project structure used in Benefactory.
It's divided into `protocol` and `ui` directories with the intent that a project
called `playground` would ship the `protocol` directory as a `playground.js` library
that any developer could use to interact with Ethereum contracts, IPFS data,
centralized web servers, and anything else needed for `playground` functionality.
The `ui` directory is the standard user interface for the application.

protocol
--------
The `protocol` directory contains Ethereum contracts and Javascript to interact
with them. It's intended for use with Truffle, which compiles and deploys
contracts, and generates Javascript that the protocol library can use to
interact with them.

### src/truffle.js
Truffle's configuration file. Add the names of the contracts you want to deploy
to this file. When you run `truffle deploy`, this list is consulted.

### src/contracts
Solidity contracts go here.

### src/environments
Truffle's environment configuration. Configuring the development environment
is enough to get started with TestRPC. Your Javascript code will import contracts
from `environments/development/contracts/Contract.sol.js` and call
Contract.load(Pudding) to get a Web3 Contract object.

I don't use Pudding in
my code, but it's well-documented, so you should start with it. If you end up
wanting to use something like [transaction-monad][1] in the future, here's the
[Pudding stub I use to load Truffle's contract data][2].

[1]: https://github.com/ConsenSys/transaction-monad
[2]: https://gist.github.com/niran/02b2fbd8572d961cde7bbf962920ce9c

### src/actions.js
Sends transactions to write data to the blockchain. A protocol with many
transactions would probably want to turn this module into a directory containing
many modules.

### src/queries.js
Queries the blockchain for data from your contracts.

### src/graph
While actions and queries can be used directly and should be used directly to
start with, using GraphQL to define a schema on top of your contracts makes it
easier to reason about the data contained in the contracts, especially for
developers who use your protocol library in their apps. The GraphQL schema and
`dataloader` objects go in this module when you're ready to tackle that
learning curve.

ui
--
The `ui` directory contains a Webpack/React project for building a UI for your
application protocol.

Running Protocol Code
---------------------
I usually create a `protocol/examples` folder where I write scripts to call my
code. I run these scripts with `babel-node <path-to-script>`. To debug them,
I run them with `babel-node-debug -c <path-to-script>`. (`-c` prevents it from
opening a new browser window for the debugger so you can just refresh the one
you already have.)

A better approach than writing examples is to build a Mocha test suite up front.
I'm too lazy for that, so I extract tests from my examples when I'm ready.

Running the UI
--------------

- testrpc -d
- cd protocol/src
- npm install
- truffle deploy
- cd ../..
- cd ui
- npm install
- npm start

When testrpc is restarted, the contracts must be redeployed with truffle, then
the protocol package (e.g. `playground`) must be reinstalled in `ui` to pull in the new
contract address.

Changing the Name
-----------------
When you want to turn your experiment into a real project, you'll want to rename
it from `playground`. If you wanted to call it `token`, you'd edit the name field
in `protocol/package.json` to `token`, then update the corresponding `playground`
dependency in `ui/package.json` to `token`. Change the name of the `ui` package
from `playground-ui` to `token-ui`.

Upgrading Dependencies
----------------------
The dependencies were pinned to recent versions when this was created, but
they're probably out of date for you, future person. Run `npm outdated` and
upgrade the packages you want with `npm install --save <package>@latest`. For
dependencies that are `devDependencies` in the `package.json`, you'll want
`--save-dev` in that command instead of `--save`.
