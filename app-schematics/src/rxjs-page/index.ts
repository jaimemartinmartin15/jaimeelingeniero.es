import { apply, mergeWith, Rule, SchematicContext, Tree, url, template, move } from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { Schema } from './schema';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';

const RXJS_ROUTING_MODULE_PATH = 'src/pages-rxjs/pages-rxjs-routing.module.ts';
const RXJS_MAIN_PAGE_HTML_PATH = 'src/pages-rxjs/pages-rxjs.component.html';

export function rxjsPage({ name }: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // create the new files
    const sourceTemplates = url('./files');
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        name,
        ...strings,
      }),
      move('src/pages-rxjs'),
    ]);

    // add new path to the component in the routing module
    let rxjsRoutingModule: string = tree.read(RXJS_ROUTING_MODULE_PATH)!.toString();
    let indexToInsert = rxjsRoutingModule.indexOf('children: [') + 11;
    rxjsRoutingModule = `${rxjsRoutingModule.slice(0, indexToInsert)}
      {
        path: '${name}',
        loadChildren: () => import('./${dasherize(name)}/${dasherize(name)}.module').then((m) => m.${classify(name)}Module),
      },${rxjsRoutingModule.slice(indexToInsert)}`;
    tree.overwrite(RXJS_ROUTING_MODULE_PATH, rxjsRoutingModule);

    // add link in the menu
    let rxjsMainPageHtml: string = tree.read(RXJS_MAIN_PAGE_HTML_PATH)!.toString();
    indexToInsert = rxjsMainPageHtml.indexOf('</nav>');
    rxjsMainPageHtml = `${rxjsMainPageHtml.slice(
      0,
      indexToInsert
    )}  <a [routerLink]="['/comprende-rxjs/${name}']" routerLinkActive="menu-section-active">${name}</a>
  ${rxjsMainPageHtml.slice(indexToInsert)}`;
    tree.overwrite(RXJS_MAIN_PAGE_HTML_PATH, rxjsMainPageHtml);

    return mergeWith(sourceParametrizedTemplates);
  };
}
