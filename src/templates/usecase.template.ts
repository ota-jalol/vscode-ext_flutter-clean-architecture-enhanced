import * as changeCase from "change-case";

export function getUseCaseTemplate(featureName: string, useCaseName: string): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const pascalCaseUseCaseName = changeCase.pascalCase(useCaseName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  
  return `import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';

import '../entities/${changeCase.snakeCase(featureName.toLowerCase())}.dart';
import '../repositories/${changeCase.snakeCase(featureName.toLowerCase())}_repository.dart';
import '../../core/error/failures.dart';
import '../../core/usecases/usecase.dart';

class ${pascalCaseUseCaseName} implements UseCase<${pascalCaseFeatureName}, ${pascalCaseUseCaseName}Params> {
  final ${pascalCaseFeatureName}Repository repository;

  ${pascalCaseUseCaseName}(this.repository);

  @override
  Future<Either<Failure, ${pascalCaseFeatureName}>> call(${pascalCaseUseCaseName}Params params) async {
    return await repository.get${pascalCaseFeatureName}(params.id);
  }
}

class ${pascalCaseUseCaseName}Params extends Equatable {
  final int id;

  const ${pascalCaseUseCaseName}Params({required this.id});

  @override
  List<Object> get props => [id];
}
`;
}