import * as changeCase from "change-case";

export function getDisplayWidgetTemplate(featureName: string): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  
  return `import 'package:flutter/material.dart';

import '../../domain/entities/${changeCase.snakeCase(featureName.toLowerCase())}.dart';

class ${pascalCaseFeatureName}Display extends StatelessWidget {
  final ${pascalCaseFeatureName} ${camelCaseFeatureName};

  const ${pascalCaseFeatureName}Display({
    Key? key,
    required this.${camelCaseFeatureName},
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height / 3,
      child: Column(
        children: <Widget>[
          Text(
            ${camelCaseFeatureName}.name,
            style: const TextStyle(fontSize: 50, fontWeight: FontWeight.bold),
          ),
          Expanded(
            child: Center(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    Text(
                      'ID: \${${camelCaseFeatureName}.id}',
                      style: const TextStyle(fontSize: 25),
                    ),
                    // Add more fields here as needed
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
`;
}