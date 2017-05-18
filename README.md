# SPFXShoppingList
Implementation of Shopping List web part implemented client-side using the SharePoint Framework.

## Introduction

The Shopping List web part will show the contents of a SharePoint list, named "Shopping List" by default. It is intended as a demonstration client-side web part using ReactJS, Office-UI-Fabric and the PnP-Core-JS library to show how a full-featured web part can be built with very few lines of code.

ReactJS is used here as the view rendering framework, which is a good match as we don't require a more comprehensive SPA framework such as Angular. A number of React components are included in the Office-UI-Fabric which allows us to build UI elements that implement the modern SharePoint and Office look and feel simply by including those components in the TSX markup. Instead of building a model, we simply use the PnP-Core-JS library components which provide a sufficient encapsulation of the underlying SharePoint REST calls (this might not be the case for a more complex application). The PnP-Core-JS library has its own cacheing mechanism which ensures that we don't make unnecessary calls to SharePoint. The cache is configurable, but we are using the default settings.

### Building the code

You will need Node and Git installed on your machine. To learn how to set up a development environment for the SharePoint Framework, go to dev.office.com/sharepoint and follow the Get Started link.

```bash
git clone https://github.com/SPDoctor/SPFXShoppingList.git
cd SPFXShoppingList
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
