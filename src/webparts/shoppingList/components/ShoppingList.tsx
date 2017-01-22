import * as React from 'react';
import * as fabric from 'office-ui-fabric-react'; // should just import needed modules for production use
import * as pnp from 'sp-pnp-js';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { IShoppingListWebPartProps } from '../IShoppingListWebPartProps';

export interface IShoppingListProps extends IShoppingListWebPartProps {
}

export default class ShoppingList extends React.Component<IShoppingListProps, {}> {
  constructor(props: IShoppingListProps) {
    super(props);
    // set initial state
    this.state = { Title: "", SpinnerVisible: false, HelpVisible: false, Items: [] };
  }

  public componentDidMount(): void {
    this.getData();
  }

  private getData() {
    var that: any = this; // save 'this' so it is available from within the closure
    if (!(Environment.type === EnvironmentType.Local)) {
      that.setState({ SpinnerVisible: true });
      // make sure we are on the correct web...
      var web = new pnp.Web(this.props.context.pageContext.web.absoluteUrl);
      var listName = this.props.listName || "ShoppingList";
      web.lists.getByTitle(listName).items.usingCaching().get().then(result => {
        var items: any = result.map(r => r.Title);
        that.setState({ Items: items });
        that.setState({ SpinnerVisible: false });
      });
    }
    else { // running locally - use test data
      that.setState({ SpinnerVisible: true });
      setTimeout(() => { // simulated fetch
        var items = that.state["Items"];
        if(items.length === 0) items = ["Item 1", "Item 2", "Item 3"];
        that.setState({ Items: items });
        that.setState({ SpinnerVisible: false });
      },1000);
    }
  }

  private addData(text: string) {
    var that: any = this; // save 'this' so it is available from within the closure
    if (!(Environment.type === EnvironmentType.Local)) {
      var web = new pnp.Web(this.props.context.pageContext.web.absoluteUrl);
      var listName = this.props.listName || "ShoppingList";
      web.lists.getByTitle(listName).items.add({Title: text}).then(() => {
        that.getData();
      });
    }
    else { // running locally - use test data
      that.setState({ SpinnerVisible: true });
      setTimeout(() => { // simulated fetch
        var items = that.state["Items"];
        items.push(text);
        that.setState({ Items: items });
        that.setState({ SpinnerVisible: false });
      },1000);
    }
  }

  private renderItem(item: string): JSX.Element {
    return <div className="ms-ListItem"><i className="ms-Icon ms-Icon--RadioBullet" aria-hidden="true"></i> { item } </div>;
  }

  private renderItems(): JSX.Element {
    var rows = [];
    for (var i in this.state["Items"]) rows.push(this.renderItem(this.state["Items"][i]));
    return <div className="ms-List">{rows}</div>;
  }

  public render(): JSX.Element {
    const commandBarItems = [
      { key: 'newItem', name: 'New', icon: 'Add', onClick: () => this.addData("new item") },
      { key: 'upload', name: 'Upload', icon: 'Upload', onClick: () => { return; }  },
      { key: 'share', name: 'Share', icon: 'Share', onClick: () => { return; } },
      { key: 'refresh', name: 'Refresh', icon: 'Sync', onClick: () => this.getData() },
      { key: 'help', name: 'Help', icon: 'Help', onClick: () => this.setState({HelpVisible: true}) }
    ];

    return (
      <div>
      <h1 className="ms-bgColor-themeLighter"><i className="ms-Icon ms-Icon--ShoppingCart" aria-hidden="true"></i> {this.props.title?this.props.title:"Shopping List"}</h1>
        {this.renderItems() }
        <hr />
        <div className="ms-Grid"> 
          <div className="ms-Grid-row">
            <div className="ms-Grid-col">
              <fabric.Button onClick={() => this.getData() } className="ms-Button--primary">Refresh List</fabric.Button>
            </div>
            <div className="ms-Grid-col">
              {this.state["SpinnerVisible"] ? <fabric.Spinner type={fabric.SpinnerType.large} /> : <span/> }
            </div>
          </div>
        </div>
        {Environment.type === EnvironmentType.Local ? <h3 className="ms-bgColor-error">Running locally with mock data</h3> : <span/> }

        <fabric.CommandBar isSearchBoxVisible={true} searchPlaceholderText='Search...' items={[]} farItems={commandBarItems} />

        <fabric.Panel isOpen={this.state["HelpVisible"]} onDismiss={() => this.setState({ HelpVisible: false }) }>
          <h2>More information for Shopping List Web Part</h2>
          <i className="ms-Icon ms-Icon--ShoppingCart ms-font-su" aria-hidden="true"></i>
          <p>
          The Shopping List web part is designed to illustrate building a web part using client-side technology and the SharePoint Framework.
          </p>
          <h3>Technologies used</h3>
          <p>
          The Shopping List web part will show the contents of a SharePoint list, named "Shopping List" by default. It is intended as a demonstration client-side web part using ReactJS, Office-UI-Fabric and the PnP-Core-JS library to show how a full-featured web part can be built with very few lines of code.
          </p>
          <p>
          ReactJS is used here as the view rendering framework, which is a good match as we don't require a more comprehensive SPA framework such as Angular. A number of React components are included in the Office-UI-Fabric which allows us to build UI elements that implement the modern SharePoint and Office look and feel simply by including those components in the TSX markup. Instead of building a model, we simply use the PnP-Core-JS library components which provide a sufficient encapsulation of the underlying SharePoint REST calls (this might not be the case for a more complex application). The PnP-Core-JS library has its own cacheing mechanism which ensures that we don't make unnecessary calls to SharePoint. The cache is configurable, but we are using the default settings.
          </p>
        </fabric.Panel>
      </div>
    );
  }
}
