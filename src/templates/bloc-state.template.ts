import * as changeCase from "change-case";

export function getBlocStateTemplate (
  blocName: string,
  useEquatable: boolean
): string {
  return useEquatable
    ? getEquatableBlocStateTemplate(blocName)
    : getDefaultBlocStateTemplate(blocName);
}

function getEquatableBlocStateTemplate (blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  return `part of '${snakeCaseBlocName}_bloc.dart';

abstract class ${pascalCaseBlocName}State extends Equatable {
  const ${pascalCaseBlocName}State();  

  @override
  List<Object> get props => [];
}

class Empty extends ${pascalCaseBlocName}State {}

class Loading extends ${pascalCaseBlocName}State {}

class Loaded extends ${pascalCaseBlocName}State {
  final ${pascalCaseBlocName} ${changeCase.camelCase(blocName.toLowerCase())};

  const Loaded({required this.${changeCase.camelCase(blocName.toLowerCase())}});

  @override
  List<Object> get props => [${changeCase.camelCase(blocName.toLowerCase())}];
}

class Error extends ${pascalCaseBlocName}State {
  final String message;

  const Error({required this.message});

  @override
  List<Object> get props => [message];
}
`;
}

function getDefaultBlocStateTemplate (blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  return `part of '${snakeCaseBlocName}_bloc.dart';

@immutable
abstract class ${pascalCaseBlocName}State {}

class Empty extends ${pascalCaseBlocName}State {}

class Loading extends ${pascalCaseBlocName}State {}

class Loaded extends ${pascalCaseBlocName}State {
  final ${pascalCaseBlocName} ${changeCase.camelCase(blocName.toLowerCase())};

  const Loaded({required this.${changeCase.camelCase(blocName.toLowerCase())}});
}

class Error extends ${pascalCaseBlocName}State {
  final String message;

  const Error({required this.message});
}
`;
}