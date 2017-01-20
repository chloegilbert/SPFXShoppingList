import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';
import ShoppingList, { IShoppingListProps } from './components/ShoppingList';
import { IShoppingListWebPartProps } from './IShoppingListWebPartProps';

export default class ShoppingListWebPart extends BaseClientSideWebPart<IShoppingListWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IShoppingListProps> = React.createElement(ShoppingList, {
      description: this.properties.description,
      showLists: this.properties.showLists,
      listName: this.properties.listName,
      showItems: this.properties.showItems,
      showUser: this.properties.showUser,
      self: this
    });
    ReactDom.render(element, this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "ShoppingList Settings"
          },
          groups: [
            {
              groupName: "Properties",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Description Field",
                  placeholder: "enter a description"
                }),
                PropertyPaneCheckbox('showLists', {
                  checked: false,
                  text: "Show Lists"
                }),
                PropertyPaneTextField('listName', {
                  label: "List Name",
                  placeholder: "enter list name"
                }),
                PropertyPaneCheckbox('showItems', {
                  checked: false,
                  text: "Show Items"
                }),
                PropertyPaneCheckbox('showUser', {
                  checked: false,
                  text: "Show User"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
