import * as changeCase from "change-case";

export function getRemoteDataSourceTemplate(featureName: string, projectName: string = "my_app"): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:dio/dio.dart';
import 'package:${projectName}/core/error/exceptions.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/data/models/${snakeCaseFeatureName}_model.dart';

abstract class ${pascalCaseFeatureName}RemoteDataSource {
  Future<${pascalCaseFeatureName}Model> get${pascalCaseFeatureName}(int id);
}

class ${pascalCaseFeatureName}RemoteDataSourceImpl implements ${pascalCaseFeatureName}RemoteDataSource {
  final Dio dio;

  ${pascalCaseFeatureName}RemoteDataSourceImpl({required this.dio});

  @override
  Future<${pascalCaseFeatureName}Model> get${pascalCaseFeatureName}(int id) async {
    return ${pascalCaseFeatureName}Model(id: id, name: 'Sample ${pascalCaseFeatureName}');
  }
}
`;
}