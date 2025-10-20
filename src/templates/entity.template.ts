import * as changeCase from "change-case";

export function getEntityTemplate(entityName: string): string {
  const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
  const snakeCaseEntityName = changeCase.snakeCase(entityName.toLowerCase());
  
  return `import 'package:freezed_annotation/freezed_annotation.dart';

part '${snakeCaseEntityName}.freezed.dart';

@freezed
class ${pascalCaseEntityName} with _$${pascalCaseEntityName} {
  const factory ${pascalCaseEntityName}({
    required int id,
    required String name,
    // Add more properties as needed
  }) = _${pascalCaseEntityName};
}
`;
}