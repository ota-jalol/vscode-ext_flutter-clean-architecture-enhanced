import * as changeCase from "change-case";

export function getRepositoryTemplate(featureName: string, projectName: string = "my_app"): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:dartz/dartz.dart';
import 'package:${projectName}/core/error/failures.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/domain/entities/${snakeCaseFeatureName}.dart';

abstract class ${pascalCaseFeatureName}Repository {
  Future<Either<Failure, List<${pascalCaseFeatureName}>>> get${pascalCaseFeatureName}s();
  Future<Either<Failure, ${pascalCaseFeatureName}>> get${pascalCaseFeatureName}(int id);
  Future<Either<Failure, ${pascalCaseFeatureName}>> create${pascalCaseFeatureName}(${pascalCaseFeatureName} ${camelCaseFeatureName});
  Future<Either<Failure, ${pascalCaseFeatureName}>> update${pascalCaseFeatureName}(${pascalCaseFeatureName} ${camelCaseFeatureName});
  Future<Either<Failure, bool>> delete${pascalCaseFeatureName}(int id);
}
`;
}