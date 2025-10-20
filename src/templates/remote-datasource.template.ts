import * as changeCase from "change-case";

export function getRemoteDataSourceTemplate(featureName: string, projectName: string = "my_app"): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:${projectName}/core/error/exceptions.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/data/models/${snakeCaseFeatureName}_model.dart';

abstract class ${pascalCaseFeatureName}RemoteDataSource {
  Future<List<${pascalCaseFeatureName}Model>> get${pascalCaseFeatureName}s();
  Future<${pascalCaseFeatureName}Model> get${pascalCaseFeatureName}(int id);
  Future<${pascalCaseFeatureName}Model> create${pascalCaseFeatureName}(${pascalCaseFeatureName}Model ${changeCase.camelCase(featureName.toLowerCase())}Model);
  Future<${pascalCaseFeatureName}Model> update${pascalCaseFeatureName}(${pascalCaseFeatureName}Model ${changeCase.camelCase(featureName.toLowerCase())}Model);
  Future<void> delete${pascalCaseFeatureName}(int id);
}

class ${pascalCaseFeatureName}RemoteDataSourceImpl implements ${pascalCaseFeatureName}RemoteDataSource {
  final Dio dio;

  ${pascalCaseFeatureName}RemoteDataSourceImpl({required this.dio});

  @override
  Future<List<${pascalCaseFeatureName}Model>> get${pascalCaseFeatureName}s() async {
    try {
      final response = await dio.get('/${snakeCaseFeatureName}s');
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = response.data;
        return jsonList.map((json) => ${pascalCaseFeatureName}Model.fromJson(json)).toList();
      } else {
        throw ServerException();
      }
    } catch (e) {
      throw ServerException();
    }
  }

  @override
  Future<${pascalCaseFeatureName}Model> get${pascalCaseFeatureName}(int id) async {
    try {
      final response = await dio.get('/${snakeCaseFeatureName}s/$id');
      
      if (response.statusCode == 200) {
        return ${pascalCaseFeatureName}Model.fromJson(response.data);
      } else {
        throw ServerException();
      }
    } catch (e) {
      throw ServerException();
    }
  }

  @override
  Future<${pascalCaseFeatureName}Model> create${pascalCaseFeatureName}(${pascalCaseFeatureName}Model ${changeCase.camelCase(featureName.toLowerCase())}Model) async {
    try {
      final response = await dio.post(
        '/${snakeCaseFeatureName}s',
        data: ${changeCase.camelCase(featureName.toLowerCase())}Model.toJson(),
      );
      
      if (response.statusCode == 201) {
        return ${pascalCaseFeatureName}Model.fromJson(response.data);
      } else {
        throw ServerException();
      }
    } catch (e) {
      throw ServerException();
    }
  }

  @override
  Future<${pascalCaseFeatureName}Model> update${pascalCaseFeatureName}(${pascalCaseFeatureName}Model ${changeCase.camelCase(featureName.toLowerCase())}Model) async {
    try {
      final response = await dio.put(
        '/${snakeCaseFeatureName}s/\${${changeCase.camelCase(featureName.toLowerCase())}Model.id}',
        data: ${changeCase.camelCase(featureName.toLowerCase())}Model.toJson(),
      );
      
      if (response.statusCode == 200) {
        return ${pascalCaseFeatureName}Model.fromJson(response.data);
      } else {
        throw ServerException();
      }
    } catch (e) {
      throw ServerException();
    }
  }

  @override
  Future<void> delete${pascalCaseFeatureName}(int id) async {
    try {
      final response = await dio.delete('/${snakeCaseFeatureName}s/$id');
      
      if (response.statusCode != 200 && response.statusCode != 204) {
        throw ServerException();
      }
    } catch (e) {
      throw ServerException();
    }
  }
}
`;
}