Node Typescript Express Template
================================

Project template for using NodeJS with the Express Framework and TypeScript code to create a web application.

[![bitHound Score](https://www.bithound.io/github/Cecildt/node-typescript-template/badges/score.svg)](https://www.bithound.io/github/Cecildt/node-typescript-template)
[![bitHound Dependencies](https://www.bithound.io/github/Cecildt/node-typescript-template/badges/dependencies.svg)](https://www.bithound.io/github/Cecildt/node-typescript-template/master/dependencies/npm)

Developer Application Requirements
----------------------------------
Install these globally using the following command:

````
npm install -g bower express typescript tsd nodemon gulp
````

### Compile Everything
First obtain all external references, packages & type definitions by running the following command:

````
npm install
````

This will (1) download all NPM packages referenced in the project, (2) download all bower packages and (3) download all TypeScript type definitions. Steps 2 & 3 are done after `npm install` completes as dictated by a script in the `package.json` file. You can run them manually using `bower install` and `tsd reinstall` if you wanted.

Compile the TypeScript, used in Node.js application, by running the following command from within the root of the application:

````
gulp compile-ts
````

You can remove all compiled JavaScript and source maps by running the following:

````
gulp clean-build
````

When developing you can run the following Gulp tasks.

- **Lint all TypeScript** (gulp task **lint-ts**)
    - Command: 
      ```` 
      gulp lint-ts 
      ````
    - This will check all TypeScript to ensure it meets the coding style rules defined in the [tslint.json](tslint.json) file.
- **Compile all TypeScript** (gulp task **compile-ts**)
    - Command: 
      ```` 
      gulp compile-ts 
      ````
    - This compiles all the TypeScript to JavaScript.
- **Lint all JavaScript** (gulp task **lint-js**)
    - Command: 
      ```` 
      gulp lint-js 
      ````
    - This will check all JavaScript to ensure it meets the coding style rules defined in the [.eslintrc](.eslintrc) file.
- **Compress and minify Client-side JavaScript** (gulp task **compress**)
    - Command: 
      ```` 
      gulp compress 
      ````
    - This will combine all client-side JavaScript and minify the combined file.

### Run the Node Server
```
    node build/server.js
```

The web application should be accessible at http://localhost:1337

### Original Layout Structure Links:
--------------------------
- https://github.com/andrewconnell/pres-o365-node.git
- http://weblogs.asp.net/dwahlin/creating-a-typescript-workflow-with-gulp
 

