# jaimeelingeniero

This is the repository containing my personal web page deployed to amazon s3. You can visit it at [jaimeelingeniero.es](https://jaimeelingeniero.es)

## Development

### Clone the repository

Run `git clone https://github.com/jaimemartinmartin15/jaimeelingeniero.git`

### Install dependencies

Run `npm install`. You might need a valid personal access token to download some scoped dependencies on GPR (Github Package Registry). If you cannot obtain it, remove the dependency and install again. You will have to work without generating the icons.

### Start the server

Run `npm start` for a dev server. The browser should open on `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start:public` for a public dev server. The browser should open on `http://localhost/`. You can also open it on other devices connected on the same private network connecting to the private IP of your computer. The app will automatically reload if you change any of the source files.

Run `npm run start:prod` to serve the dist folder. You need to build the app beforehand. This allows to simulate what files are downloaded in real server when deployed.

### Build the app

Before building the application, generate the icons. Run `npm run icons`.

Run `npm run build` to build the project. The output will be stored in the `dist/` directory.

### Deploy the app

Deploys are done when you push a new tag to the server. That is how the [workflow](.github\workflows\build-and-publish.yml) is configured.

In master branch run `git merge develop --no-commit --no-ff`. Before completing the commit, increase the version in [package.json](package.json): `npm version minor --no-git-tag-version`. It can be minor or patch. Finish the commit and create a tag with the same version that the package. Push the branch and the tag created.
