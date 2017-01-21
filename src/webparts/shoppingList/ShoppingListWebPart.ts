import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import ShoppingList, { IShoppingListProps } from './components/ShoppingList';
import { IShoppingListWebPartProps } from './IShoppingListWebPartProps';

export default class ShoppingListWebPart extends BaseClientSideWebPart<IShoppingListWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IShoppingListProps> = React.createElement(ShoppingList, {
      title: this.properties.title,
      listName: this.properties.listName,
      context: this.context
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
                PropertyPaneTextField('title', {
                  label: "Title",
                  placeholder: "enter list title"
                }),
                PropertyPaneTextField('listName', {
                  label: "List Name",
                  placeholder: "enter list name"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
