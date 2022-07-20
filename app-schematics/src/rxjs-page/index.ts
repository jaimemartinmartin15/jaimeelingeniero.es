import { apply, mergeWith, Rule, SchematicContext, Tree, url, template, move } from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { Schema } from './schema';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';

const RXJS_ROUTING_MODULE_PATH = 'src/pages-rxjs/routable-lateral-menu/routable-lateral-menu-routing.module.ts';

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
        loadChildren: () => import('../${dasherize(name)}/${dasherize(name)}.module').then((m) => m.${classify(name)}Module),
      },${rxjsRoutingModule.slice(indexToInsert)}`;
    tree.overwrite(RXJS_ROUTING_MODULE_PATH, rxjsRoutingModule);

    // update the sitemap.txt
    const PATH_SITEMAP = '/sitemap.txt';
    let sitemapFile: string = tree.read(PATH_SITEMAP)!.toString();
    sitemapFile += `\nhttps://www.jaimeelingeniero.es/comprende-rxjs/${name}`;
    tree.overwrite(PATH_SITEMAP, sitemapFile);

    return mergeWith(sourceParametrizedTemplates);
  };
}
