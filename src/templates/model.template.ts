import * as changeCase from "change-case";

export function getModelTemplate(featureName: string): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/entities/${snakeCaseFeatureName}.dart';

part '${snakeCaseFeatureName}_model.freezed.dart';
part '${snakeCaseFeatureName}_model.g.dart';

@freezed
class ${pascalCaseFeatureName}Model with _$${pascalCaseFeatureName}Model {
  const factory ${pascalCaseFeatureName}Model({
    required int id,
    required String name,
    // Add more properties as needed
  }) = _${pascalCaseFeatureName}Model;

  factory ${pascalCaseFeatureName}Model.fromJson(Map<String, dynamic> json) =>
      _$${pascalCaseFeatureName}ModelFromJson(json);
}

extension ${pascalCaseFeatureName}ModelX on ${pascalCaseFeatureName}Model {
  ${pascalCaseFeatureName} toEntity() {
    return ${pascalCaseFeatureName}(
      id: id,
      name: name,
    );
  }
}

extension ${pascalCaseFeatureName}X on ${pascalCaseFeatureName} {
  ${pascalCaseFeatureName}Model toModel() {
    return ${pascalCaseFeatureName}Model(
      id: id,
      name: name,
    );
  }
}
`;
}