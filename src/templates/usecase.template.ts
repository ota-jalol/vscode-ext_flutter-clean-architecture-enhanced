import * as changeCase from "change-case";

export function getUseCaseTemplate(featureName: string, useCaseName: string, projectName: string = "my_app"): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const pascalCaseUseCaseName = changeCase.pascalCase(useCaseName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:${projectName}/core/error/failures.dart';
import 'package:${projectName}/core/usecases/usecase.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/domain/entities/${snakeCaseFeatureName}.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/domain/repositories/${snakeCaseFeatureName}_repository.dart';

class ${changeCase.pascalCase(useCaseName)} implements UseCase<Either<Failure, ${pascalCaseFeatureName}>, ${changeCase.pascalCase(useCaseName)}Params> {
  final ${pascalCaseFeatureName}Repository repository;

  ${changeCase.pascalCase(useCaseName)}(this.repository);

  @override
  Future<Either<Failure, ${pascalCaseFeatureName}>> call({${changeCase.pascalCase(useCaseName)}Params? params}) async {
    return await repository.get${pascalCaseFeatureName}(params!.id);
  }
}

class ${changeCase.pascalCase(useCaseName)}Params extends Equatable {
  final int id;

  const ${changeCase.pascalCase(useCaseName)}Params({required this.id});

  @override
  List<Object> get props => [id];
}
`;
}