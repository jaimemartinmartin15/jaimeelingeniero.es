import { apply, mergeWith, Rule, SchematicContext, Tree, url, template } from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { Schema } from './schema';

export function schematicsRxjs({ name }: Schema): Rule {
  return (_: Tree, _context: SchematicContext) => {
    const sourceTemplates = url('./files');

    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        name,
        ...strings,
      }),
    ]);

    return mergeWith(sourceParametrizedTemplates);
  };
}
