import * as changeCase from "change-case";

export function getBlocEventTemplate (
  blocName: string,
  useEquatable: boolean
): string {
  return useEquatable
    ? getEquatableBlocEventTemplate(blocName)
    : getDefaultBlocEventTemplate(blocName);
}

function getEquatableBlocEventTemplate (blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  return `part of '${snakeCaseBlocName}_bloc.dart';

abstract class ${pascalCaseBlocName}Event extends Equatable {
  const ${pascalCaseBlocName}Event();

  @override
  List<Object> get props => [];
}

class Get${pascalCaseBlocName}ForId extends ${pascalCaseBlocName}Event {
  final String id;

  const Get${pascalCaseBlocName}ForId(this.id);

  @override
  List<Object> get props => [id];
}

class GetRandom${pascalCaseBlocName} extends ${pascalCaseBlocName}Event {}
`;
}

function getDefaultBlocEventTemplate (blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  return `part of '${snakeCaseBlocName}_bloc.dart';

@immutable
abstract class ${pascalCaseBlocName}Event {}

class Get${pascalCaseBlocName}ForId extends ${pascalCaseBlocName}Event {
  final String id;

  const Get${pascalCaseBlocName}ForId(this.id);
}

class GetRandom${pascalCaseBlocName} extends ${pascalCaseBlocName}Event {}
`;
}