import * as changeCase from "change-case";

export function getLocalDataSourceTemplate(featureName: string): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  
  return `import '../models/${snakeCaseFeatureName}_model.dart';

abstract class ${pascalCaseFeatureName}LocalDataSource {
  Future<List<${pascalCaseFeatureName}Model>?> getCached${pascalCaseFeatureName}s();
  Future<${pascalCaseFeatureName}Model?> getCached${pascalCaseFeatureName}(int id);
  Future<void> cache${pascalCaseFeatureName}s(List<${pascalCaseFeatureName}Model> ${camelCaseFeatureName}s);
  Future<void> cache${pascalCaseFeatureName}(${pascalCaseFeatureName}Model ${camelCaseFeatureName});
  Future<void> clear${pascalCaseFeatureName}Cache();
}

class ${pascalCaseFeatureName}LocalDataSourceImpl implements ${pascalCaseFeatureName}LocalDataSource {
  // Simple in-memory cache - no persistent storage
  Map<String, dynamic> _cache = {};

  @override
  Future<List<${pascalCaseFeatureName}Model>?> getCached${pascalCaseFeatureName}s() async {
    final cached = _cache['${camelCaseFeatureName}s'];
    if (cached != null) {
      return (cached as List<dynamic>)
          .map((json) => ${pascalCaseFeatureName}Model.fromJson(json))
          .toList();
    }
    return null;
  }

  @override
  Future<${pascalCaseFeatureName}Model?> getCached${pascalCaseFeatureName}(int id) async {
    final cached = _cache['${camelCaseFeatureName}_$id'];
    if (cached != null) {
      return ${pascalCaseFeatureName}Model.fromJson(cached);
    }
    return null;
  }

  @override
  Future<void> cache${pascalCaseFeatureName}s(List<${pascalCaseFeatureName}Model> ${camelCaseFeatureName}s) async {
    _cache['${camelCaseFeatureName}s'] = ${camelCaseFeatureName}s.map((e) => e.toJson()).toList();
  }

  @override
  Future<void> cache${pascalCaseFeatureName}(${pascalCaseFeatureName}Model ${camelCaseFeatureName}) async {
    _cache['${camelCaseFeatureName}_\${${camelCaseFeatureName}.id}'] = ${camelCaseFeatureName}.toJson();
  }

  @override
  Future<void> clear${pascalCaseFeatureName}Cache() async {
    _cache.clear();
  }
}
`;
}