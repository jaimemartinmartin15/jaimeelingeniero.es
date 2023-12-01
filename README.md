# jaimeelingeniero

This is the repository containing my personal web page deployed to amazon s3. You can visit it at [jaimeelingeniero.es](https://jaimeelingeniero.es)

[![Deploy Webpage](https://github.com/jaimemartinmartin15/jaimeelingeniero/actions/workflows/build-and-publish.yml/badge.svg)](https://github.com/jaimemartinmartin15/jaimeelingeniero/actions/workflows/build-and-publish.yml) [![Update verbs list tenses](https://github.com/jaimemartinmartin15/jaimeelingeniero/actions/workflows/update-verbs-tenses.yml/badge.svg)](https://github.com/jaimemartinmartin15/jaimeelingeniero/actions/workflows/update-verbs-tenses.yml)

## Development

### Clone the repository

Run `git clone https://github.com/jaimemartinmartin15/jaimeelingeniero.git`

### Install dependencies

Run `npm install`. You might need a valid personal access token to download some scoped dependencies on GPR (Github Package Registry). If you cannot obtain it, remove the dependency and install again. You will have to work without generating the icons. You will need also to remove the generated module imports that cannot be resolved.

### Start the server

Run `npm start` for a dev server. The browser should open on `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start:public` for a public dev server. The browser should open on `http://localhost/`. You can also open it on other devices connected on the same private network connecting to the private IP of your computer. The app will automatically reload if you change any of the source files.

Run `npm run start:prod` to serve the dist folder. You need to build the app beforehand. This allows to simulate what files are downloaded in real server when deployed.

### Build the app

Before building the application, generate the icons. Run `npm run icons`.

Run `npm run build` to build the project. The output will be stored in the `dist/` directory.

### Deploy the app

Deploys are done when you push a new tag to the server. That is how the [workflow](.github\workflows\build-and-publish.yml) is configured.

Create a tag on the commit to deploy and push it to the server. The workflow file in that commit will be used! Be careful!

## Board

There is a (private) [Trello board](https://trello.com/b/gnJWWpVh/jaime-el-ingeniero) created to organize the tasks and new features.

## General reminders to build new feature

* Add new `<url>` entry to [sitemap.xml](./sitemap.xml)
* Check the [robots.txt](./robots.txt) if necessary
* In routing module:
  * Add title for the new page
  * Add router data metaTags (description and keywords)
  * Add router data headerPrint (author and date) if necessary
  * Add router data favIcons if they are different than the default and check they work
* Make sure invalid routes are redirected correctly
* Review mobile and desktop designs
