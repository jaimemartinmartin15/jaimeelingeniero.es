import { apply, mergeWith, Rule, SchematicContext, Tree, url, template, move } from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { Schema } from './schema';

export function rxjsPage({ name }: Schema): Rule {
  return (_: Tree, _context: SchematicContext) => {
    const sourceTemplates = url('./files');

    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        name,
        ...strings,
      }),
      move('src/pages-rxjs'),
    ]);

    return mergeWith(sourceParametrizedTemplates);
  };
}
