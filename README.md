Node Typescript Express Template
================================

Project template for using NodeJS with the Express Framework and TypeScript code to create a web application.


Developer Application Requirements
----------------------------------
Install these globally using the following command:

````
npm install -g bower express typescript tsd nodemon gulp node-inspector
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
    - This will check all TypeScript to ensure it meets the coding style rules defined in the [tslint.json](tslint.json) file.
- **Update TypeScript references** (gulp task **gen-server-tsrefs**)
    - There are three files referenced at the top of every TypeScript file. 
    - The first, **typings/tsd.d.ts**, contains references to all TypeScript type definition files obtained using the tool [tsd.exe](http://definitelytyped.org/tsd). 
    - The other file that's referenced is **typings/server.d.ts**... it references the TypeScript files used within the application. 
    - This saves the developer from adding all these references to each and every file in the project. 
- **Compile all TypeScript** (gulp task **compile-ts**) 
    - This compiles all the TypeScript to JavaScript.
- **Lint all JavaScript** (gulp task **lint-js**)
    - This will check all JavaScript to ensure it meets the coding style rules defined in the [.eslintrc](.eslintrc) file.
- **Compress and minify Client-side JavaScript** (gulp task **compress**)
    - This will combine all client-side JavaScript and minify the combined file.

### Original Layout Structure Links:
--------------------------
- https://github.com/andrewconnell/pres-o365-node.git
- http://weblogs.asp.net/dwahlin/creating-a-typescript-workflow-with-gulp
 

