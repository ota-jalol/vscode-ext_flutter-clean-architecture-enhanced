import * as changeCase from "change-case";

export function getRepositoryTemplate(featureName: string): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  
  return `import 'package:dartz/dartz.dart';
import '../entities/${changeCase.snakeCase(featureName.toLowerCase())}.dart';
import '../../core/error/failures.dart';

abstract class ${pascalCaseFeatureName}Repository {
  Future<Either<Failure, List<${pascalCaseFeatureName}>>> get${pascalCaseFeatureName}s();
  Future<Either<Failure, ${pascalCaseFeatureName}>> get${pascalCaseFeatureName}(int id);
  Future<Either<Failure, ${pascalCaseFeatureName}>> create${pascalCaseFeatureName}(${pascalCaseFeatureName} ${camelCaseFeatureName});
  Future<Either<Failure, ${pascalCaseFeatureName}>> update${pascalCaseFeatureName}(${pascalCaseFeatureName} ${camelCaseFeatureName});
  Future<Either<Failure, bool>> delete${pascalCaseFeatureName}(int id);
}
`;
}