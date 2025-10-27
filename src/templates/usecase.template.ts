import * as changeCase from "change-case";

export function getUseCaseTemplate(featureName: string, projectName: string = "my_app"): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:dartz/dartz.dart';
import 'package:${projectName}/core/error/failures.dart';
import 'package:${projectName}/core/usecases/usecase.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/domain/entities/${snakeCaseFeatureName}.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/domain/repositories/${snakeCaseFeatureName}_repository.dart';

class Get${pascalCaseFeatureName} implements UseCase<${pascalCaseFeatureName}, int> {
  final ${pascalCaseFeatureName}Repository repository;

  Get${pascalCaseFeatureName}(this.repository);

  @override
  Future<Either<Failure, ${pascalCaseFeatureName}>> call(int id) async {
    return await repository.get${pascalCaseFeatureName}(id);
  }
}
`;
}