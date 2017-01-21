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
    this.state = { Title: "", SpinnerVisible: false, Items: [] };
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
        that.setState({ Items: ["Item 1", "Item 2", "Item 3"] });
        that.setState({ SpinnerVisible: false });
      },1000);
    }
  }

  private renderItem(item: string): JSX.Element {
    return <div className="ms-ListItem"><i className="ms-Icon ms-Icon--RadioBullet" aria-hidden="true"></i> { item } </div>;
  }

  private renderItems(): JSX.Element {
    return (
      <div>
        <fabric.List items={this.state["Items"]} onRenderCell={ this.renderItem } />
      </div>);
  }

  public render(): JSX.Element {
    return (
      <div>
      <h1 className="ms-bgColor-themeLighter">{this.props.title?this.props.title:"Shopping List"}</h1>
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
      </div>
    );
  }
}
