import * as changeCase from "change-case";

export function getLocalDataSourceTemplate(featureName: string, projectName: string = "my_app"): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:${projectName}/core/error/exceptions.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/data/models/${snakeCaseFeatureName}_model.dart';

abstract class ${pascalCaseFeatureName}LocalDataSource {
  Future<${pascalCaseFeatureName}Model?> getCached${pascalCaseFeatureName}(int id);
  Future<void> cache${pascalCaseFeatureName}(${pascalCaseFeatureName}Model ${camelCaseFeatureName});
}

class ${pascalCaseFeatureName}LocalDataSourceImpl implements ${pascalCaseFeatureName}LocalDataSource {
  ${pascalCaseFeatureName}LocalDataSourceImpl();

  @override
  Future<${pascalCaseFeatureName}Model?> getCached${pascalCaseFeatureName}(int id) async {
    return ${pascalCaseFeatureName}Model(id: id, name: 'Cached ${pascalCaseFeatureName}');
  }

  @override
  Future<void> cache${pascalCaseFeatureName}(${pascalCaseFeatureName}Model ${camelCaseFeatureName}) async {
    // Cache implementation goes here
  }
}
`;
}