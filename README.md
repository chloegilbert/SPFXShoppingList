# SPFXShoppingList
Implementation of Shopping List web part implemented client-side using the SharePoint Framework.

## shopping-list

This is where you include your web part docs.

### Building the code

You will need Node and Git installed on your machine. To learn how to set up a development environment for the SharePoint Framework, go to dev.office.com/sharepoint and follow the Get Started link.

```bash
git clone https://github.com/SPDoctor/SPFXShoppingList.git
cd SPFXShoppingList
npm install -g gulp
npm install
gulp serve
```

The **npm install** command will download and install everything required, and may well take twenty minutes or so depending on your Internet connection, etc.

This package produces the following:

* lib/* commonjs components - this allows this package to be reused from other packages.
* dist/* - a single bundle containing the components used for uploading to a cdn pointing a registered Sharepoint webpart library to.
* example/* a test page that hosts all components in this package.

### Build options

gulp serve - run locally using the SharePoint Framework workbench
gulp package - build package for distribution
